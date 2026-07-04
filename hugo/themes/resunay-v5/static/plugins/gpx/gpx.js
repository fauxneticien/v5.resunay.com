/**
 * GPX Plugin
 * Renders a Strava/RideWithGPS-style ride widget from a GPX file:
 * a Leaflet route map, a summary stat bar, and an elevation profile.
 * Self-contained: needs the global `L` (Leaflet) + map tiles; parses GPX itself.
 */

// --- GPX parsing -----------------------------------------------------------

function parseGpx(xmlText) {
  const xml = new DOMParser().parseFromString(xmlText, 'text/xml');
  const trk = xml.getElementsByTagName('trkpt');
  const pts = [];
  for (const pt of trk) {
    const eleEl = pt.getElementsByTagName('ele')[0];
    const timeEl = pt.getElementsByTagName('time')[0];
    pts.push({
      lat: parseFloat(pt.getAttribute('lat')),
      lon: parseFloat(pt.getAttribute('lon')),
      ele: eleEl ? parseFloat(eleEl.textContent) : null,
      time: timeEl ? new Date(timeEl.textContent) : null,
    });
  }
  const nameEl = xml.getElementsByTagName('name')[0];
  return { pts, name: nameEl ? nameEl.textContent : null };
}

// --- stats -----------------------------------------------------------------

function haversine(a, b) {
  const R = 6371000, toRad = d => d * Math.PI / 180;
  const dLat = toRad(b.lat - a.lat), dLon = toRad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function computeStats(pts) {
  let distance = 0, gain = 0;
  const cumDist = [0];
  for (let i = 1; i < pts.length; i++) {
    distance += haversine(pts[i - 1], pts[i]);
    cumDist.push(distance);
    if (pts[i].ele != null && pts[i - 1].ele != null) {
      const d = pts[i].ele - pts[i - 1].ele;
      if (d > 0) gain += d;                 // total ascent (approx; raw positive delta)
    }
  }
  const t0 = pts[0].time, t1 = pts[pts.length - 1].time;
  const elapsed = (t0 && t1) ? (t1 - t0) / 1000 : null;  // seconds
  const avgSpeed = elapsed ? (distance / elapsed) * 3.6 : null;  // km/h
  return { distance, gain, elapsed, avgSpeed, cumDist };
}

function fmtDuration(s) {
  if (s == null) return '—';
  const h = Math.floor(s / 3600), m = Math.round((s % 3600) / 60);
  return h ? `${h}h ${String(m).padStart(2, '0')}m` : `${m}m`;
}

// --- elevation profile (inline SVG) ---------------------------------------

function elevationSvg(pts, cumDist) {
  const W = 1000, H = 120, pad = 4;
  const eles = pts.map(p => p.ele).filter(e => e != null);
  if (!eles.length) return '';
  const minE = Math.min(...eles), maxE = Math.max(...eles);
  const spanE = (maxE - minE) || 1;
  const totalD = cumDist[cumDist.length - 1] || 1;
  const x = d => pad + (d / totalD) * (W - 2 * pad);
  const y = e => (H - pad) - ((e - minE) / spanE) * (H - 2 * pad);
  let d = '';
  for (let i = 0; i < pts.length; i++) {
    if (pts[i].ele == null) continue;
    d += `${d ? 'L' : 'M'}${x(cumDist[i]).toFixed(1)} ${y(pts[i].ele).toFixed(1)}`;
  }
  const area = `${d}L${x(totalD).toFixed(1)} ${H - pad}L${x(0).toFixed(1)} ${H - pad}Z`;
  return `<svg class="gpx-elevation" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"
      role="img" aria-label="Elevation profile">
      <path class="gpx-elev-area" d="${area}"/>
      <path class="gpx-elev-line" d="${d}"/>
    </svg>`;
}

// --- rendering -------------------------------------------------------------

function statBar(stats) {
  const cell = (v, l) => `<div class="gpx-stat"><span class="gpx-stat-value">${v}</span><span class="gpx-stat-label">${l}</span></div>`;
  return `<div class="gpx-stats">
    ${cell((stats.distance / 1000).toFixed(1) + ' km', 'Distance')}
    ${cell(Math.round(stats.gain) + ' m', 'Elevation')}
    ${cell(fmtDuration(stats.elapsed), 'Time')}
    ${cell(stats.avgSpeed != null ? stats.avgSpeed.toFixed(1) + ' km/h' : '—', 'Avg speed')}
  </div>`;
}

async function render(widget) {
  const url = widget.dataset.gpx;
  if (!url) return;
  let data;
  try {
    const res = await fetch(url);
    data = parseGpx(await res.text());
  } catch (e) {
    widget.innerHTML = `<p class="gpx-error">Could not load GPX: ${e.message}</p>`;
    return;
  }
  const pts = data.pts.filter(p => Number.isFinite(p.lat) && Number.isFinite(p.lon));
  if (pts.length < 2) { widget.innerHTML = `<p class="gpx-error">No track points found.</p>`; return; }

  const stats = computeStats(pts);
  const title = widget.dataset.title || data.name || 'Route';

  const mapEl = document.createElement('div');
  mapEl.className = 'gpx-map';
  widget.innerHTML = `<div class="gpx-title">${title}</div>`;
  widget.appendChild(mapEl);
  widget.insertAdjacentHTML('beforeend', statBar(stats));
  widget.insertAdjacentHTML('beforeend', elevationSvg(pts, stats.cumDist));

  const latlngs = pts.map(p => [p.lat, p.lon]);
  const map = L.map(mapEl, { scrollWheelZoom: false });
  // CARTO Positron — light minimal style; {r} + detectRetina serve @2x tiles
  // on hidpi screens so the basemap stays crisp. No API key required.
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 20,
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }).addTo(map);
  const line = L.polyline(latlngs, { color: '#fc4c02', weight: 4 }).addTo(map);
  map.fitBounds(line.getBounds(), { padding: [20, 20] });
  const dot = (ll, fill) => L.circleMarker(ll, {
    radius: 6, color: '#fff', weight: 2, fillColor: fill, fillOpacity: 1,
  }).addTo(map);
  dot(latlngs[0], '#2ecc40');                       // start (green)
  dot(latlngs[latlngs.length - 1], '#ff4136');      // end (red)
}

// --- Plugin Export ---------------------------------------------------------

export default {
  name: 'gpx',
  selector: '.gpx-widget[data-gpx]',
  render,
  init() {
    document.querySelectorAll(this.selector).forEach(el => this.render(el));
  },
};
