<script>
    export let name;
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

<h1>Hello {name}!</h1>
<button on:click={loadComponent}>Load component</button>

{#if child}
    <svelte:component this={child} />
{/if}
