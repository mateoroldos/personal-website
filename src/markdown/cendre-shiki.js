/**
 * Cendre as a TextMate theme, for Shiki.
 *
 * The upstream theme (cendretheme.com) ships Neovim, Zed, Helix and friends —
 * all of which key off tree-sitter capture names. Shiki needs TextMate scopes,
 * so the scopes below are ours; the colours and the role each one plays are
 * taken verbatim from `lua/cendre/palette.lua` at the `hard` depth, the same
 * source the site's own tokens in `src/styles/global.css` come from.
 */

const ground = {
	bg1: '#201b19', // cursorline — matches the site's `--card`
};

const ink = {
	fg: '#e6d5c2', // variables, plain text
	fg_dim: '#a09384', // operators, delimiters
	comment: '#73665b', // quiet on purpose: 3.32:1, deliberately under AA
};

const pigment = {
	brass: '#fcba81', // functions, methods, calls
	ember: '#ea9875', // properties, fields, params
	sap: '#99af6b', // every literal value
	cinder: '#d1766e', // keywords, control flow, storage
	frost: '#4e89a2', // types, classes, constructors
};

/** @type {import('shiki').ThemeRegistrationRaw} */
export const cendreShiki = {
	name: 'cendre',
	type: 'dark',
	bg: ground.bg1,
	fg: ink.fg,
	colors: {
		'editor.background': ground.bg1,
		'editor.foreground': ink.fg,
	},
	settings: [
		{ settings: { background: ground.bg1, foreground: ink.fg } },

		{
			scope: ['comment', 'punctuation.definition.comment'],
			settings: { foreground: ink.comment, fontStyle: 'italic' },
		},

		{
			scope: [
				'keyword',
				'keyword.control',
				'keyword.operator.new',
				'keyword.operator.expression',
				'storage',
				'storage.type',
				'storage.modifier',
				'variable.language',
				'entity.name.tag',
			],
			settings: { foreground: pigment.cinder },
		},

		{
			scope: [
				'entity.name.function',
				'entity.name.function.member',
				'support.function',
				'meta.function-call',
				'variable.function',
			],
			settings: { foreground: pigment.brass },
		},

		{
			scope: [
				'entity.name.type',
				'entity.name.class',
				'entity.name.namespace',
				'entity.other.inherited-class',
				'support.type',
				'support.class',
			],
			settings: { foreground: pigment.frost },
		},

		{
			scope: [
				'string',
				'string.quoted',
				'punctuation.definition.string',
				'constant.numeric',
				'constant.language',
				'constant.language.boolean',
				'markup.inline.raw',
				'markup.raw',
			],
			settings: { foreground: pigment.sap },
		},

		{
			scope: [
				'variable.parameter',
				'variable.other.property',
				'variable.other.object.property',
				'support.variable.property',
				'meta.object-literal.key',
				'entity.other.attribute-name',
				'constant.character.escape',
				'string.regexp',
				'meta.decorator',
				'punctuation.decorator',
			],
			settings: { foreground: pigment.ember },
		},

		{
			scope: ['variable', 'variable.other', 'constant.other', 'support.constant'],
			settings: { foreground: ink.fg },
		},

		{
			scope: ['keyword.operator', 'punctuation', 'meta.brace', 'punctuation.separator'],
			settings: { foreground: ink.fg_dim },
		},

		{ scope: 'markup.heading', settings: { foreground: pigment.ember, fontStyle: 'bold' } },
		{ scope: 'markup.bold', settings: { foreground: pigment.ember, fontStyle: 'bold' } },
		{ scope: 'markup.italic', settings: { foreground: pigment.ember, fontStyle: 'italic' } },
		{ scope: 'markup.underline.link', settings: { foreground: ink.comment } },

		{ scope: 'invalid', settings: { foreground: '#d25780' } },
	],
};
