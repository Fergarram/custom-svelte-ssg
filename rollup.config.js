import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import execute from 'rollup-plugin-execute';
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;

// Static File Generation Configuration
const ClientBundleConfig = {
	input: 'build/client.js',
	output: {
		sourcemap: true,
		format: 'es',
		name: 'app',
		dir: 'dist'
	},
	plugins: [
		svelte({
			dev: !production,
			hydratable: true,
			preprocess: sveltePreprocess()
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
		file: 'dist/.temp/ssr.js'
	},
	plugins: [
		svelte({
			dev: !production,
			generate: 'ssr',
			preprocess: sveltePreprocess()
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
