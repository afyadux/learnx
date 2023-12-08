


<script lang="ts">

</script>

<main>
    <h1>Hello World</h1>


    <div class="grid">
        {#each Array(5) as _ }
        <p>Test</p>
        {/each }
    </div>
    


</main>

<style lang="scss">
    @use "$lib/interface/variables" as app;

    div.grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }

    h1 {
        color: app.$color-brand;
    }
</style>

