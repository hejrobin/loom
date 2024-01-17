module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:react/jsx-runtime',
	],
	ignorePatterns: [
		'dist',
		'.eslintrc.cjs',
		'*.d.ts',
		'tsconfig.json',
		'tsconfig.node.json',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh', 'prettier'],
	settings: {
		react: {
			version: 'detect'
		},
		'import/resolver': {
			node: {
				paths: ['src'],
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{
				allowConstantExport: true,
			},
		],
	},
};
