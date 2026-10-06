# Design

Document-like and content-first, with room for personality.
[COMPASS.md](COMPASS.md) owns the purpose.

## Reading

- Let content lead; keep navigation and metadata quiet.
- Let Markdown elements carry the page: paragraphs, headings, lists, quotes, and code.
- Build hierarchy with spacing and restrained type. Use rules only for meaningful breaks.
- Keep article text comfortably sized and its line length suited to reading.
  Give headings more space above than below; keep paragraphs closer together.
- Contain code and image overflow on narrow screens; keep enlarged text usable.
- Make links recognizable, focus visible, and secondary text readable.
  Use semantic headings, useful alt text, and more than color to convey meaning.

## Visual system

[src/styles/global.css](src/styles/global.css) owns shared tokens and prose styles.
Use soft off-white surfaces, near-black text, and readable neutral grey metadata.
Keep links monochrome and underlined. Retain restrained syntax colour for code;
keep inline code free of decorative chips.
Dark mode uses neutral charcoal surfaces and soft light text. Default to the device
preference; offer System, Light, and Dark in the footer and remember the selection.

Newsreader carries headings, body, navigation, and metadata; IBM Plex Mono is for code.
Prefer Tailwind's existing scale and shadcn's semantic tokens. Extend the theme only
for a demonstrated need; do not create aliases merely to repackage one-off values.
Separate entries with space; keep article dates and reading times secondary to titles.
Use regular-weight Phosphor icons in the text colour, rendered as static SVG.
Pair controls with text labels; keep decorative icons hidden from assistive technology.

Let photography, diagrams, and playful details earn their place through content.
Avoid decorative gradients, glass, excessive cards, and futuristic AI imagery.
Use plain language and preserve Mateo’s voice.
Use everyday words and short, direct sentences, including when describing big ideas.
Simplify the wording without removing the ideas: design principles, engineering
principles, and building with AI should not become generic curiosity or experimentation.
Keep the homepage introduction brief; let the work express the larger questions.
Prefer concrete descriptions to claims about ability.
Use biography where it adds context.

Add interaction only where it helps; keep reading lightweight. Motion needs a
purpose and must respect reduced motion.

## Review

Check both themes on a real article at narrow and wide widths, including keyboard navigation,
enlarged text, contrast, and code/images. Check reduced motion when motion changes.
Judge spacing and type on real writing, not isolated samples.
