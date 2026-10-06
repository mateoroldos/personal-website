# Design

Document-like and content-first, with room for personality.
[COMPASS.md](COMPASS.md) owns the purpose.

## Reading

- Let content lead; keep navigation and metadata quiet.
- Let Markdown elements carry the page: paragraphs, headings, lists, quotes, and code.
- Build hierarchy with spacing and restrained type. Use rules only for meaningful breaks.
- Set article text at 20px with 1.6 line-height and a measure up to 65ch.
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
Use the named typography roles in the theme for titles, introductions, descriptions,
reading text, and metadata. Roles own size, leading, weight, and tracking; change
them in the theme rather than adding page-level overrides or arbitrary values.
Keep layout on Tailwind's spacing scale and colours on shadcn's semantic tokens.
Separate entries with space; place article dates after descriptions.
Use regular-weight Phosphor icons in the text colour, rendered as static SVG.
Pair controls with text labels; keep decorative icons hidden from assistive technology.

Let photography, diagrams, and playful details earn their place through content.
Avoid decorative gradients, glass, excessive cards, and futuristic AI imagery.
Use plain language and preserve Mateo’s voice.

Add interaction only where it helps; keep reading lightweight. Motion needs a
purpose and must respect reduced motion.

## Review

Check both themes on a real article at narrow and wide widths, including keyboard navigation,
enlarged text, contrast, and code/images. Check reduced motion when motion changes.
Judge spacing and type on real writing, not isolated samples.
