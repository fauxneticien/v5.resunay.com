# AGENTS.md

Guidance for AI coding agents working in this repo. Tool-agnostic.

## Project

`v5.resunay.com` — the personal website of **Nay San**. Version 5, a rebuild in progress.

- **Plain static site** — HTML + CSS authored directly: no framework, no
  static-site generator, no build step.
- **Built locally, deployed to Cloudflare Pages** (`resunay-v5.pages.dev`).
  Cloudflare is a host, not a build environment — **no cloud build**.
- **Current scope:** a homepage with **sidebar + bio** only. Writing/Work
  sections and a separate blog are deferred to later phases.

## Layout

```
public/              ← the deploy artefact (Cloudflare Pages serves this dir)
  index.html         homepage (sidebar + bio)
  Nay-San_CV.pdf     CV (kept at root, outside the immutable /assets cache)
  _headers           Cloudflare Pages headers (long-cache for /assets/*)
  assets/            style.css, photo.jpg
Dockerfile           Node dev container: Task + Wrangler + gh
docker-compose.yaml  idle container; mounts the repo + host gh config (read-only)
Taskfile.yml         build / preview / create / push
wrangler.toml        Cloudflare Pages project config
tmp/                 scratch / design notes (gitignored; not deployed)
```

`public/` is the **permanent deploy contract**: today it holds the static files
directly; if a generator is ever introduced, source moves to `src/` and builds
*into* `public/` so the deploy config never changes. Keep it generator-agnostic
— no tool-specific directories.

## Dev workflow

```sh
docker compose up -d    # start the dev container
# attach to it (VS Code "Attach to Running Container" / docker exec)
task preview            # serve ./public at http://localhost:8919
task build              # build into ./public (a no-op until there's a real build step)
task push               # deploy ./public to Cloudflare Pages (production)
```

## Planning practice

Non-trivial work is scoped in a **dated topic folder** under `tmp/` before
implementation:

```
tmp/YYYY-MM-DD_<topic>/        e.g. tmp/2026-06-12_v5-ideation/
```

Each holds that phase's plan (`README.md`), design notes, references, and
throwaway prototypes. `tmp/` is **gitignored** — scratch, never deployed. When a
phase is validated, its deliverable graduates to the repo (e.g. into `public/`)
and the planning folder stays behind as a record.

Start a phase by writing `tmp/YYYY-MM-DD_<topic>/README.md` with the plan first.

## Working with Nay

- **Nay runs all cloud / remote commands himself** — `wrangler` (Pages
  deploy/auth), `git push`, and anything that touches Cloudflare or GitHub.
  Agents *prepare* the commands and configs but **do not execute** them; hand
  Nay the exact command to run.
- **Commit attribution:** an agent authors **its own commits under its own
  identity** (a clear non-Nay name + a `noreply` email), never under Nay's
  identity, and keeps them solo (no co-author trailers). Nay commits his
  hand-edits **separately** under his own name, so the two are easy to tell
  apart (`git log --author=…`).
- **Commit / push only when asked.** Prefer small, focused commits.

## Coding style & philosophy

- **Dead simple and human-readable.** Keep code — especially CSS — minimal,
  conventional, and easy for a person to read and maintain without special
  tooling. No over-engineering, no abstractions or framework-y patterns until
  genuinely needed. **Longevity over cleverness.** (Most code here is
  agent-written; the bar is that a human could comfortably read and hand-edit
  it, not that it was typed by hand.)
- **Minimal dependencies.** No framework and no build step until there's a real
  reason. System fonts. (Font Awesome is a CDN dependency for contact icons for
  now; self-host or inline it later.)
- **Semantic HTML; a light, system-sans visual language** with a single accent
  link colour. Match the existing conventions in `public/`.
- **Keep things decoupled** — the homepage and the future blog are independent;
  don't entangle them.
- **Verify visually** after page changes: it should render cleanly on desktop
  and at ≤700px mobile (sidebar stacks and centers; contact becomes an icon row).
