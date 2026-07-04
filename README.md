# v5.resunay.com

Personal website for **Nay San** — version 5. 🚧 Rebuild in progress.

Hugo static site, built locally and deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

## Develop

```sh
docker compose build   # (re)build the dev image (Hugo + Task + Wrangler + gh)
docker compose up -d   # start the dev container
task dev               # Hugo dev server + LiveReload at http://localhost:8919
task build             # Hugo build: hugo/ -> public/
task preview           # Pages-faithful serve of ./public at http://localhost:8919
task push              # deploy to Cloudflare Pages
```

The container runs as your user (uid 1000), so build output in `./public` is
yours, not root. For a root shell (e.g. ad-hoc `apt-get`):

```sh
docker exec -u 0 -it resunay-v5-dev bash
```
