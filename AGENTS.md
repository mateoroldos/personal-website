# Working on mateoroldos.com

Read [COMPASS.md](COMPASS.md) before product or content-structure decisions and
[DESIGN.md](DESIGN.md) before visual, interaction, or editorial presentation work.
[README.md](README.md) owns setup, preview, publishing, and deployment commands.

## Working rules

- Inspect the existing implementation before proposing changes. Explain the
  smallest coherent approach before large structural changes.
- Preserve published URLs, existing content, and work already in progress.
  Do not rewrite Mateo’s articles without an editorial request.
- Keep one Markdown collection until actual content needs another structure.
  A possible publishing format is not a reason to add a collection or taxonomy.
- Prefer static pages and existing Astro patterns. Add dependencies, client-side
  behavior, or abstractions only for a demonstrated need.
- Keep each decision in one place. Link to the compass, design guidance, and
  executable configuration rather than duplicating them in new instructions.

## Where changes belong

| Concern | Owner |
| --- | --- |
| Frontmatter and content loading | [src/content.config.ts](src/content.config.ts) |
| Publication text | `src/content/blog/` |
| Article URLs and draft exclusion | [src/pages/blog/[id].astro](src/pages/blog/[id].astro) |
| Home content and article listing | [src/pages/index.astro](src/pages/index.astro) |
| Shared page shell and metadata | [src/layouts/Layout.astro](src/layouts/Layout.astro) |
| Shared visual tokens and prose | [src/styles/global.css](src/styles/global.css) |

## Verification

- For docs, check commands, local links, and agreement with the implementation.
- For content, routing, configuration, or rendering changes, run `bun run build`.
  It validates collection data and generates production pages; it is not a full
  type, lint, accessibility, or browser check.
- For publishing changes, inspect production output: published URLs work, drafts
  are absent, and metadata and any feed links resolve to their intended pages.
- For visual or interaction changes, follow the rendered review in DESIGN.md.
  Inspect the affected page, not only a component in isolation.
- Add a test only for a credible behavioral regression that existing checks or
  direct inspection cannot adequately catch.
- Report what was checked, the results, and any gaps. The project has no aggregate
  `check` command; do not claim checks that have not been configured or run.

## Astro reference

Start the dev server in background mode using the command in README.md.
Consult the relevant official guide before working on these areas:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
