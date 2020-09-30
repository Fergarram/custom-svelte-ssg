import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import execute from "rollup-plugin-execute";
import html from "rollup-plugin-bundle-html";

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: "main.js",
    output: {
      sourcemap: true,
      format: "iife",
      name: "app",
      file: "public/dist/bundle.js"
    },
    plugins: [
      svelte({
        dev: !production,
        hydratable: true
      }),
      resolve({
        browser: true,
        dedupe: importee =>
          importee === "svelte" || importee.startsWith("svelte/")
      }),
      commonjs(),
      html({
        template: "template.html",
        dest: "public",
        filename: "index.html",
        inject: "body"
      })
    ]
  },
  {
    input: "components/layout.svelte",
    output: {
      format: "cjs",
      file: "public/.temp/ssr.js"
    },
    plugins: [
      svelte({
        // enable run-time checks when not in production
        dev: !production,
        generate: "ssr"
      }),
      resolve({
        browser: true,
        dedupe: importee =>
          importee === "svelte" || importee.startsWith("svelte/")
      }),
      commonjs(),
      execute("node prerender.js")
    ]
  }
];
