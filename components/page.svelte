<script>
    export let route;
    let child;

    async function loadComponent() {
        child = ( await import('./child.svelte') ).default;
    }
</script>

<style>
    h1 {
        color: purple;
    }
</style>

<h1>Hello {route}!</h1>
<button on:click={loadComponent}>Load component</button>

{#if child}
    <svelte:component this={child} />
{/if}
