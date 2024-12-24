import globals from 'globals';
import pluginJs from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import nodePlugin from 'eslint-plugin-node';

/** @type {import('eslint').Linter.Config[]} */
export default [
	pluginJs.configs.recommended,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			ecmaVersion: 2024,
			sourceType: 'module',
		},
		plugins: {
			import: importPlugin,
			node: nodePlugin,
		},
		rules: {
			'import/prefer-default-export': 'off',
			'no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_|req|res|next|value' },
			],
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'spaced-comment': 'off',
			'consistent-return': 'off',
			'func-names': 'off',
			'object-shorthand': 'off',
			'no-process-exit': 'off',
			'no-param-reassign': 'off',
			'no-return-await': 'off',
			'no-underscore-dangle': 'off',
			'class-methods-use-this': 'off',
			'prefer-destructuring': ['error', { object: true, array: false }],
		},
	},
];
