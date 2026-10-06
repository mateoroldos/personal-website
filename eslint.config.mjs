import { plugin as shadcn } from "@shadcn/lint";
import tsParser from "@typescript-eslint/parser";
import * as astroParser from "astro-eslint-parser";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["src/**/*.astro"],
		languageOptions: {
			parser: astroParser,
			parserOptions: { parser: tsParser },
		},
		plugins: { shadcn },
		settings: { shadcn: { note: "Use the theme in src/styles/global.css; see DESIGN.md." } },
		rules: {
			"shadcn/no-arbitrary-values": "error",
			"shadcn/no-raw-colors": "error",
			"shadcn/no-unknown-classes": ["error", { allow: ["theme-picker"] }],
			"shadcn/require-static-classes": "error",
		},
	},
]);
