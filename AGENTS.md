# AGENTS.md

Guidance for AI coding agents working in this repo. Tool-agnostic.

## Project

`v5.resunay.com` — the personal website of **Nay San**. Version 5, a rebuild in progress.

- **Hugo static site** — posts in Markdown, templates in a vendored theme. The
  homepage is a standalone Hugo layout (plain HTML), decoupled from the blog.
- **Built locally, deployed to Cloudflare Pages** (`resunay-v5.pages.dev`).
  Cloudflare is a host, not a build environment — **no cloud build**.
- **Current scope:** a **sidebar + bio** homepage plus a **blog at `/blog/`**
  with one post (Warlpiri Encyclopaedic Dictionary). More posts/sections later.

## Layout

```
hugo/                ← Hugo source (builds into public/ via publishDir=../public)
  hugo.toml          site config (baseURL, markup, imaging)
  content/blog/      posts — Markdown page bundles (images alongside index.md)
  layouts/index.html standalone homepage (sidebar + bio; its own styling)
  themes/resunay-v5/ vendored reading theme + shortcodes
  static/            homepage assets: assets/{style.css,photo.jpg}, Nay-San_CV.pdf, _headers
public/              ← GENERATED deploy artefact (Cloudflare Pages serves this); gitignored
Dockerfile           Node dev container: Hugo + Task + Wrangler + gh
docker-compose.yaml  idle container; mounts the repo + host gh config (read-only)
Taskfile.yml         build / dev / preview / create / push
wrangler.toml        Cloudflare Pages project config
tmp/                 scratch / design notes (gitignored; not deployed)
```

`public/` is the **permanent deploy contract**: Hugo builds *into* it from
`hugo/`, so the Cloudflare Pages output dir and `task push` never change.
`public/` is **generated and gitignored — never hand-edit it**. (The source
folder is named `hugo/` for obviousness; earlier notes called it `src/`.)

## Dev workflow

```sh
docker compose build    # rebuild the image once (Hugo was added to the Dockerfile)
docker compose up -d    # start the dev container
# attach to it (VS Code "Attach to Running Container" / docker exec)
task dev                # Hugo dev server + LiveReload at http://localhost:8919 (fast edit loop)
task build              # Hugo build: hugo/ -> public/
task preview            # Pages-faithful serve of ./public at http://localhost:8919
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
- **Minimal dependencies.** Hugo is the one build dependency; no JS framework.
  System fonts (the homepage adds Inter + Noto Sans Myanmar via the Google Fonts
  CDN). (Font Awesome is a CDN dependency for contact icons for now; self-host or
  inline it later.)
- **Semantic HTML; a light, system-sans visual language** with a single accent
  link colour. Match the existing conventions in `public/`.
- **Keep things decoupled** — the homepage and the future blog are independent;
  don't entangle them.
- **Verify visually** after page changes: it should render cleanly on desktop
  and at ≤700px mobile (sidebar stacks and centers; contact becomes an icon row).
