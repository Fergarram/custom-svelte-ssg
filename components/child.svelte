<script>
    let counter = 0;
</script>

<style>
    button {
        color: red;
        font-size: 40px;
        font-weight: bold;
    }
</style>

<button on:click={() => (counter += 1)}> {counter} </button>
