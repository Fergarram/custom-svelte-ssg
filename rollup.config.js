import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import execute from 'rollup-plugin-execute';
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

// Static File Generation Configuration
const ClientBundleConfig = {
	input: 'build/client.js',
	output: {
		sourcemap: true,
		format: 'es',
		name: 'app',
		dir: 'public/dist'
	},
	plugins: [
		svelte({
			dev: !production,
			hydratable: true
		}),
		resolve({
			browser: true,
			dedupe: importee =>
				importee === 'svelte' || importee.startsWith('svelte/')
		}),
		terser()
	]
};

const PrerendingConfig = {
	input: 'components/page.svelte',
	output: {
		format: 'cjs',
		file: 'public/.temp/ssr.js'
	},
	plugins: [
		svelte({
			dev: !production,
			generate: 'ssr'
		}),
		resolve({
			browser: true,
			dedupe: importee =>
				importee === 'svelte' || importee.startsWith('svelte/')
		}),
		execute('node build/server.js')
  ]
};

export default [ ClientBundleConfig, PrerendingConfig ];
