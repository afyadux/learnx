<script lang="ts">

    import Coursecard from "$lib/cards/coursecard.svelte";
    import Lessoncard from "$lib/cards/lessoncard.svelte";
    import type { CourseData, lessonData } from "$lib/models/app";
    import Hero from "$lib/sections/hero.svelte";
    import { user } from "$lib/utilities/authentication.js";

    export let data : { courses: CourseData[], lessons: lessonData[], institutional: CourseData[] }; 
    const { courses, lessons, institutional } = data;


</script>

<main>
    <Hero courses={ courses }/>

    <section id="lesson">
        <h4>Jump Back in. </h4>

        <div class="grid">
            {#each lessons as lesson }
            <Lessoncard lesson={ lesson }  />
            {/each }
        </div>
    </section>


    <section id="course">
        <h4>Explore more courses. </h4>

        <div class="grid">
            {#each institutional as item }
            <Coursecard course={ item }/>
            {/each }
        </div>

    </section>

</main>


<style lang="scss">
    @use "$lib/interface/variables" as app;

    main {
        margin-top: 4rem;
        min-height: 90vh;

        > section {
            padding: 0px 5vw;
            margin-top: 3rem;
        }

        > section:last-child {
            margin-bottom: 4rem;
        }
    }

    div.grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
    }

    h4 {
        font-size: 1.3rem;
        margin-bottom: 1rem;
        color: app.$color-foreground;
    }
</style>








