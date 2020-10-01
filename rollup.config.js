import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import execute from 'rollup-plugin-execute';

const production = !process.env.ROLLUP_WATCH;

// @TODO: Somewhere in this file I need to read a file containing the slugs
//        for which I'll generate the corresponding html files.

// Static File Generation Configuration
const ClientBundleConfig = {
	input: 'source/client.js',
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
		})
	]
};

const PrerendingConfig = {
	input: 'components/layout.svelte',
	output: {
		format: 'cjs',
		file: 'public/.temp/ssr.js'
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			generate: 'ssr'
		}),
		resolve({
			browser: true,
			dedupe: importee =>
				importee === 'svelte' || importee.startsWith('svelte/')
		}),
		execute('node source/prerenderer.js')
  ]
};

export default [ ClientBundleConfig, PrerendingConfig ];
