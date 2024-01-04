import react from '@vitejs/plugin-react';
import postcssNesting from 'postcss-nesting';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	css: {
		postcss: {
			plugins: [postcssNesting],
		},
	},
});
