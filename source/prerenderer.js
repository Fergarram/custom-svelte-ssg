const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const minify = require('html-minifier').minify;

// This file comes from the SSR Svelte component.
const App = require('../public/.temp/ssr.js');

// @TODO: In order to generate html files for each route, I need to render
// an App with a route name. i.e. routes.map(r => App.render({ route: r }));
const { html, css, head } = App.render({ name: 'world' });

// Get the template so that we can replace the placeholders with the SSR stuff.
let template = fs.readFileSync(path.resolve(process.cwd(), 'public/index.html'), 'utf-8');

// Minification...
const minifiedHtml = minify(html, { collapseWhitespace: true });

// Replacing with the SSR code.
template = template.replace('%head%', head);
template = template.replace('%body%', `<style>${css.code}</style>${minifiedHtml}`);

// Saving into a file.
fs.writeFileSync(path.resolve(process.cwd(), 'public/index.html'), template);
rimraf.sync(path.resolve(process.cwd(), 'public/.temp'));
