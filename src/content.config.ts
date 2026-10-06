import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
	loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		draft: z.boolean().default(false),
		tldr: z
			.object({
				summary: z.string(),
				points: z.array(z.string()).min(1),
			})
			.optional(),
	}),
});

export const collections = { blog };
