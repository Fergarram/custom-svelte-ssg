const shortcuts = [
    {
        route: 'blog',
        icon: 'documents',
        label: 'Recent Articles'
    },
    {
        route: 'about',
        icon: 'avatar',
        label: 'About Fernando'
    },
    {
        route: 'work',
        icon: 'pencils',
        label: 'Work'
    },
    {
        route: 'thoughts',
        icon: 'thoughts',
        label: 'Thoughts'
    },
    {
        route: 'social',
        icon: 'social-media',
        label: 'Social Media'
    },
    {
        route: 'search',
        icon: 'find',
        label: 'Site Search'
    },
    {
        route: 'terminal',
        icon: 'terminal',
        label: 'Cool Tricks'
    },
    {
        route: 'creations',
        icon: 'creations',
        label: 'Digital Toys and Creations'
    },
    {
        route: 'contact',
        icon: 'contact',
        label: 'Contact Fernando'
    }
];

const cards = [
    {
        // Static Props
        route: 'about',
        title: 'About Fernando',
        x: 100,
        y: 100,
        width: 300,
        height: 250,
        // Runtime Props
        isVisible: false,
        close: null,
        component: null
    },
    {
        // Static Props
        route: 'blog',
        title: 'Recent Articles',
        x: 200,
        y: 140,
        width: 500,
        height: 400,
        // Runtime Props
        isVisible: false,
        close: null,
        component: null
    },
    {
        // Static Props
        route: 'blog/some-other-slug',
        title: 'Recent Articles',
        x: 210,
        y: 150,
        width: 500,
        height: 600,
        // Runtime Props
        isVisible: false,
        close: null,
        component: null
    },
    {
        // Static Props
        route: 'work',
        title: 'Work',
        x: 200,
        y: 140,
        width: 240,
        height: 240,
        // Runtime Props
        isVisible: false,
        close: null,
        component: null
    },
    {
        // Static Props
        route: 'contact',
        title: 'Contact Fernando',
        x: 200,
        y: 140,
        width: 240,
        height: 240,
        // Runtime Props
        isVisible: false,
        close: null,
        component: null
    },
    {
        // Static Props
        route: 'error',
        title: '404 Not Found',
        x: 200,
        y: 140,
        width: 240,
        height: 240,
        // Runtime Props
        isVisible: false,
        close: null,
        component: null
    },
];

module.exports = { shortcuts, cards };