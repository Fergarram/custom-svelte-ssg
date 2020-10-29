<style lang="scss" src="../styles/page.scss"></style>

<script>
	import Shortcuts from './shortcuts.svelte';
	import CardManager from './card-manager.svelte';
	import ArticleCard from './article-card.svelte';
	import Cards from '../data/cards.json'

	// Adding dynamic props to cards array.
	const cards = Cards.map(card => ({
		...card,
		isVisible: false,
		close: () => {},
		component: null
	}));

	const shortcutClicked = async (e) => {
		e.preventDefault();
		const href = e.currentTarget.getAttribute('href');
		const label = e.currentTarget.getAttribute('data-label');
		window.history.replaceState( {} , label, href );

		const card = cards.find(c => `/${c.route}` === href);

		if (!card) {
			console.error('No card found for route:', href);
			return;
		}

		// Otherwise load the component and set it up
		card.component = (await import(`../cards/${card.componentName}.svelte`)).default;
		card.isVisible = true;

		// Setup close callback
		card.close = () => {
			card.isVisible = false;
			cards = cards;
		};

		// Trigger reactivity
		cards = cards;

		// Focus on the new card once it is open
		console.log(card.route)
		setTimeout(() => document.getElementById(card.route).focus(), 0);
	};

    export let route;
</script>

<svelte:head>
	<title>Fernando's Awesome Website</title>
</svelte:head>

<main>
	<h1>Fernando's Awesome Website</h1>

	<Shortcuts click={shortcutClicked} />

	<CardManager>
		{#each cards as card, i}
			{#if (card.component !== null && card.isVisible)}
				<ArticleCard
					domId={card.route}
					x={card.x}
					y={card.y}
					width={card.width}
					height={card.height}
					title={`${route} / ${card.title}`}
					resizable={card.resizable}
					close={card.close}
				>
					<svelte:component
						this={card.component}
					/>
				</ArticleCard>
			{/if}
		{/each}
	</CardManager>
</main>

<footer>
	Copyright © Fernando Garcia. All rights reserved.
</footer>