const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const ncp = require('ncp').ncp;

// Clean up and prepare 'dist' directory before generating pages.
rimraf.sync( path.resolve(process.cwd(), 'dist') );
ncp(path.resolve(process.cwd(), 'static'), path.resolve(process.cwd(), 'dist'), (err) => {
    // Stop in case something went wrong with copying the static folder
    if (err) {
        throw new Error(err);
    }

    // This file comes from the SSR Svelte component.
    const page = require('../.temp/page.js');

    // Get the cards to generate the routes.
    const cardRoutes = require('../data/cards.json').map(card => card.route);

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
        const clientScript = slugs.length > 1 ? '../client.js' : 'client.js';
        const templateFile = path.resolve(process.cwd(), 'build/template.html');
        let template = fs.readFileSync(templateFile, 'utf-8');

        // Replacing with the SSR code.
        template = template.replace('%head%', head);
        template = template.replace('%body%', html);
        template = template.replace('%styles%', `<style>${css.code}</style>`);
        template = template.replace('%scripts%', `<script type="module" src="${clientScript}"></script>`)

        // Saving into a file.
        const htmlFile = path.resolve(process.cwd(), `dist/${route}.html`);
        fs.writeFileSync(htmlFile, template);

        // Clean up the .temp SSR directory.
        rimraf.sync(path.resolve(process.cwd(), '.temp'));
    });
});