<script>
    import { onMount } from 'svelte';
    import CardManager from './card-manager.svelte';
    import ArticleCard from './article-card.svelte';

    // export let route;

    // We take the visible articles and create a search query string
	// const makeRoute = (basePath) => {
	// 	const list = articles.filter(article => article.isVisible).map(article => article.id);
	// 	return list.length > 0 ? `${basePath}?with=${list}` : basePath;
    // };

    // This is the main function that dynamically loads an article component based on a name
	// const openArticleCard = async (name, event, ignoreShortcut=false) => {
	// 	let basePath, cards;

	// 	// If no name provided, let's use the URL
	// 	if (!name) {
	// 		basePath = typeof(route) !== 'undefined' ? route : 'root';
	// 		cards = window.location.search.replace('?with=', '').split(',');
	// 	}

	// 	// Get first shortcut
	// 	const shortcut = shortcuts.find(shortcut => {
	// 		return basePath ? shortcut.route.includes(basePath) : shortcut.route.includes(name);
	// 	});

	// 	// If no shortcut found show 404 and return
	// 	if (!shortcut && basePath !== 'root' && !ignoreShortcut) {
	// 		openArticleCard('404', null, true);
	// 		return;

	// 	// If the base path is 'root' and no windows should be opened
	// 	} else if (!shortcut && basePath === 'root' && !ignoreShortcut) {
	// 		return;
	// 	}

	// 	// Set the name based on basePath if provided
	// 	if (!name && basePath && !ignoreShortcut) {
	// 		name = shortcut.route.replace('/', '');
	// 	}

	// 	// Let's open more cards when provided
	// 	if (cards && cards.length > 0) {
	// 		cards.forEach(card => {
	// 			if (card) openArticleCard(card, null, true);
	// 		});
	// 	}

	// 	// Get corresponding article
	// 	const article = articles.find(article => article.id === name || article.title === name);
	// 	if (!article) {
	// 		return;
	// 	}

	// 	// Add visible cards to route if needed
	// 	if (event && !ignoreShortcut) {
	// 		event.currentTarget.setAttribute('href', makeRoute(shortcut.route));
	// 	}

	// 	// Check if card is already loaded
	// 	if (article.component) {

	// 		// Focus on it if it is open
	// 		if (article.isVisible) {
	// 			setTimeout(() => document.getElementById(article.id).focus(), 0);
	// 			return;

	// 		// Else we need to show it
	// 		} else {
	// 			article.isVisible = true;
	// 			articles = articles;
	// 			setTimeout(() => document.getElementById(article.id).focus(), 0);
	// 			return;
	// 		}
	// 	}

	// 	// Otherwise load the component and set it up
	// 	article.component = (await import(`../articles/${article.id}`)).default;
	// 	article.isVisible = true;

	// 	// Setup close callback
	// 	article.close = () => {
	// 		article.isVisible = false;
	// 		articles = articles;
	// 	};

	// 	// Trigger reactivity
	// 	articles = articles;

	// 	// Focus on the new card once it is open
	// 	setTimeout(() => document.getElementById(article.id).focus(), 0);
	// };

	// onMount(() => openArticleCard());
</script>

<main>
	<h1>Fernando's Awesome Website</h1>

	<nav id="main-navigation">
		<!-- <CardManager>
			{#each shortcuts as shortcut, i}
				<IconCard
					x={shortcut.x} y={shortcut.y}
					route={shortcut.route}
					icon={shortcut.icon}
					label={shortcut.label}
					click={openArticleCard}  />
			{/each}
		</CardManager> -->
	</nav>

	<!-- <CardManager>
		{#each articles as article, i}
			{#if (article.component !== null && article.isVisible)}
				<ArticleCard
					domId={article.id}
					x={article.x}
					y={article.y}
					width={article.width}
					height={article.height}
					title={article.title}
					close={article.close}
				>
					<svelte:component
						this={article.component}
						on:openArticleCard={ ({ detail }) => {
							openArticleCard(detail.name, detail.event);
						}}
					/>
				</ArticleCard>
			{/if}
		{/each}
	</CardManager> -->
</main>

<footer>
	Copyright © Fernando Garcia. All rights reserved.
</footer>

<style lang="scss">
    @import '../styles/reset.scss';
	@import '../styles/variables.scss';

	:global(body) {
		background-color: #0050A0;
		background-image: url(../assets/yo.jpeg);
		background-repeat: no-repeat;
		background-position: center;
	}

	h1, footer {
		position: absolute;
		bottom: 2px;
		font-weight: normal;
		font-family: $font-frank;
		font-size: 12px;
		color: white;
	}

	h1 {
		left: 4px;
	}

	footer {
		right: 4px;
	}
</style>