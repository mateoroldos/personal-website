/**
 * Sätteri hast plugin: open external links in a new tab.
 *
 * Only absolute http(s) hrefs match, so internal links (`/blog/…`, `#anchor`)
 * and mailto: keep opening in the same tab.
 */
export const externalLinks = {
	name: "external-links",
	element: {
		filter: ["a"],
		visit(node, ctx) {
			const href = node.properties?.href;
			if (typeof href !== "string" || !/^https?:\/\//i.test(href)) return;

			ctx.setProperty(node, "target", "_blank");
			ctx.setProperty(node, "rel", ["noopener", "noreferrer"]);
		},
	},
};
