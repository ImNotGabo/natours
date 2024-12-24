import airbnbBase from 'eslint-config-airbnb-base';
import prettierConfig from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginImport from 'eslint-plugin-import';

export default [
	// Airbnb Base Configuration
	airbnbBase,
	// Prettier Configuration
	prettierConfig,
	{
		// Specify the files to apply this configuration
		files: ['**/*.js'], // Adjust the glob pattern as needed
		plugins: {
			prettier: eslintPluginPrettier,
			import: eslintPluginImport,
		},
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		env: {
			node: true,
			es2024: true,
		},
		rules: {
			'prettier/prettier': 'error',
			'spaced-comment': 'off',
			'no-console': 'warn',
			'consistent-return': 'off',
			'func-names': 'off',
			'object-shorthand': 'off',
			'no-process-exit': 'off',
			'no-param-reassign': 'off',
			'no-return-await': 'off',
			'no-underscore-dangle': 'off',
			'class-methods-use-this': 'off',
			'prefer-destructuring': [
				'error',
				{
					object: true,
					array: false,
				},
			],
			'no-unused-vars': [
				'error',
				{
					argsIgnorePattern: 'req|res|next|val',
				},
			],
		},
	},
];
