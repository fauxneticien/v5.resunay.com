# Local dev/build image for the resunay v5 static site.
#
# Builds happen locally on the homelab (Threadripper Pro 5955WX); only the built
# artefacts in public/ are pushed to Cloudflare Pages. No cloud build.
#
# Contents: Node base + Task (go-task) + Wrangler + GitHub CLI (gh).
#
# Multi-arch: builds natively on arm64 (Macbook Air M3) and amd64 (homelab) —
# nothing pins a platform. Keep this Debian-based (glibc): Wrangler's `pages dev`
# uses `workerd`, whose prebuilt binaries need glibc and will NOT run on Alpine
# (musl) on either architecture.

FROM node:lts-bookworm-slim

# system tools: git/ssh for repo work + VS Code attach; curl/ca-certs/gnupg for installs
RUN apt-get update && apt-get install -y --no-install-recommends \
      git curl ca-certificates openssh-client gnupg \
  && rm -rf /var/lib/apt/lists/*

# GitHub CLI (official apt repo; `dpkg --print-architecture` keeps it arch-aware -> arm64 + amd64)
RUN mkdir -p -m 755 /etc/apt/keyrings \
  && curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
       -o /etc/apt/keyrings/githubcli-archive-keyring.gpg \
  && chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
       > /etc/apt/sources.list.d/github-cli.list \
  && apt-get update \
  && apt-get install -y --no-install-recommends gh \
  && rm -rf /var/lib/apt/lists/* \
  && git config --global --add safe.directory /workspace

# Task (go-task) -> /usr/local/bin/task
RUN sh -c "$(curl -fsSL https://taskfile.dev/install.sh)" -- -d -b /usr/local/bin

# Wrangler (pin a version for reproducibility if desired, e.g. wrangler@4)
RUN npm install -g wrangler

WORKDIR /workspace

# preview port — uncommon, matches Taskfile PREVIEW_PORT + docker-compose ports
EXPOSE 8919

# idle container: `docker compose up -d`, then attach in VS Code and run tasks
CMD ["sleep", "infinity"]
