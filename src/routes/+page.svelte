<script lang="ts">

    import EventCard from "$lib/cards/EventCard.svelte";
import Coursecard from "$lib/cards/coursecard.svelte";
    import Lessoncard from "$lib/cards/lessoncard.svelte";
    import Hero from "$lib/components/hero.svelte";
    

</script>

<main>


    <Hero/>

    <section id="lesson">
        <h4>Jump Back in. </h4>


        <div class="grid">
            {#each Array(3) as _ }
            <Lessoncard/>
            {/each }
        </div>


    </section>


    <section id="course">

        <h4>Explore more courses. </h4>

        <div class="grid">
            {#each Array(4) as _ }
            <Coursecard/>
            {/each }
        </div>

    </section>

</main>


<style lang="scss">
    @use "$lib/interface/variables" as app;

    main {
        margin-top: 4rem;
        margin-left: 5vw;
        margin-right: 5vw;
        min-height: 90vh;
    }

    div.grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;

     }

     h4 {
        font-size: 26px;
        font-weight: bolder;
        margin-bottom: 15px;
     }





  

               


</style>








