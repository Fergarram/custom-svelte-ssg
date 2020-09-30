<script>
    import Child from "./child.svelte";

    export let name;
</script>

<style>
    h1 {
        color: purple;
    }
</style>

<h1>Hello {name}!</h1>
<Child />
