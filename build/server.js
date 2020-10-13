const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

// This file comes from the SSR Svelte component.
const page = require('../dist/.temp/ssr.js');

// Get the cards to generate the routes.
const cardRoutes = require('../scripts/data.js').cards.map(card => card.route);

// In client.js, I pass 'index' when the pathname is '/'.
let routes = [ 'index', ...cardRoutes ];


for (let i = 0; i < routes.length; i++) {
    // Do we already have this route?
    // If we do, we need to find add an index file to that route.
    repeatedIndex = routes.indexOf( routes[i].split('/')[0] );
    if ( repeatedIndex !== -1 && repeatedIndex !== i ) {
        routes[repeatedIndex] += '/index';
    }
}

// Generate HTML files and directories
routes.forEach( route => {
    const { html, css, head } = page.render({ route: route.replace('/index', '') });
    const slugs = route.split('/');

    // Create directory if needed
    if (slugs.length > 1) {
        const dir = `dist/${slugs[0]}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }

    // Get the template so that we can replace the placeholders with the SSR stuff.
    const importPrefix = slugs.length > 1 ? '../' : '';
    const templateFile = path.resolve(process.cwd(), 'build/template.html');
    let template = fs.readFileSync(templateFile, 'utf-8');

    // Replacing with the SSR code.
    template = template.replace('%head%', head);
    template = template.replace('%body%', `<style>${css.code}</style>${html}`).trim();
    template = template.replace('%scripts%', `<script type="module" src="${importPrefix}dist/client.js"></script>`)

    // Saving into a file.
    const htmlFile = path.resolve(process.cwd(), `dist/${route}.html`);
    fs.writeFileSync(htmlFile, template);

    // Clean up the .temp SSR directory.
    rimraf.sync(path.resolve(process.cwd(), 'dist/.temp'));

    // @TODO: (Nice to have) Cleanup the temp directories.
});