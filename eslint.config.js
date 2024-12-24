import globals from 'globals';
import pluginJs from '@eslint/js';
import react from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';
import airbnb from 'eslint-config-airbnb';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import nodePlugin from 'eslint-plugin-node';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
	pluginJs.configs.recommended,
	// airbnb,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			ecmaVersion: 2021,
			sourceType: 'module',
		},
		plugins: {
			react,
			import: importPlugin,
			'jsx-a11y': jsxA11y,
			node: nodePlugin,
			prettier: prettierPlugin,
		},
		rules: {
			'prettier/prettier': [
				'error',
				{
					endOfLine: 'auto',
					singleQuote: true,
				},
			],
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react/jsx-props-no-spreading': 'off',
			'import/prefer-default-export': 'off',
			'jsx-a11y/anchor-is-valid': [
				'error',
				{
					components: ['Link'],
					specialLink: ['href', 'to'],
					aspects: ['invalidHref', 'preferButton'],
				},
			],
		},
	},
	prettier,
];
