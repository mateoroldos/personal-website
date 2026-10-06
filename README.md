# mateoroldos.com

Mateo Roldos’s personal website and publishing home, built with Astro and local
Markdown, deployed as static files to Cloudflare.

- [Compass](COMPASS.md): purpose, practice, and priorities.
- [Design](DESIGN.md): reading experience and visual guidance.
- [Agent instructions](AGENTS.md): working rules and verification.

## Run locally

Use Bun and a Node version supported by [package.json](package.json).

```sh
bun install

bun run dev --background
```

Open the local URL reported by the server (normally `http://localhost:4321`).

| Command | Purpose |
| --- | --- |
| `bun run lint` | Check Astro classes against the theme |
| `bun run astro dev status` | Check the background server |
| `bun run astro dev logs` | Read its logs |
| `bun run astro dev stop` | Stop it |

## Publish a piece

1. Create `src/content/blog/your-slug.md` using a lowercase, hyphenated filename.
   Keep files directly in this directory; the article route accepts one path segment.
2. Copy this frontmatter and write below it:

   ```markdown
   ---
   title: "A question worth investigating"
   description: "A short summary for readers and page metadata."
   pubDate: 2026-10-06
   draft: true
   ---

   Start with the observation.
   ```

3. Preview at `/blog/your-slug/`. Drafts appear in development, including on the home
   page, but are excluded from production pages and the production home listing.
4. Set the intended publication date and change `draft` to `false` when ready.
   Omitting `draft` also publishes the piece; a future date does not schedule it.
5. Run `bun run build`, then `bun run preview` to inspect the production version.
6. Run `bun run deploy` when ready to publish to Cloudflare.

The filename determines the URL. Keep it stable after publication; changing a
title does not require renaming the file. Keep existing `/blog/…/` URLs working.

Use fenced Markdown blocks for code. Put images in `public/blog/` and reference
them as `/blog/filename.ext` with descriptive alt text. Notes, essays, collections,
and experiment write-ups can use the same format without category metadata.
The collection loads `.md` files; interactive pieces need implementation
work when their content calls for it.

## Build and deployment

`bun run build` validates collection data and writes the static site to `dist/`.
See [AGENTS.md](AGENTS.md#verification) for the checks appropriate to each change.

`bun run deploy` rebuilds and uploads through Wrangler. It requires Cloudflare
credentials with access to the target in [wrangler.jsonc](wrangler.jsonc).
