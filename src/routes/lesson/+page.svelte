<script lang="ts">
    import Lessoncard from "$lib/cards/lessoncard.svelte";
    import type { CourseData, lessonData } from "$lib/models/app";
    import { user } from "$lib/functions/authentication.js";

    export let data; 
    const { lessons } = data;


    console.log(data);

    let enrolledUI : lessonData[] = [];
    let availableUI: lessonData[] = lessons;

</script>

<main>
    <section>
        <h3>Lessons</h3>
        
        {#if availableUI.length === 0 }
            <div class="empty">
                <div class="thumbnail"><img src="/images/empty/tutorial.png" alt=""></div>
                <div class="msg">
                    <h3 style="text-align: center;">{ $user.role === "student" ? "You are not enrolled in any courses that offer tutorial lessons" : "You are not eaching any courses with tutorial lessons" }</h3>
                    <p>Check out the available classes from the <a href="/course">courses</a> page & start { $user.role === "student" ? "learning" : "teaching" }</p>
                </div>
            </div>
        {:else}
        <div class="grid enrolled">
            {#each availableUI as item }
            <Lessoncard lesson={ item } />
            {/each }
        </div>
        {/if}

    </section>

    <section id="join"></section>
</main>

<style lang="scss">
    @use "$lib/interface/variables" as app;

    main {
        padding-top: 5rem;
        padding-bottom: 8rem;
        min-height: calc(100vh - 12rem);

        div.grid {
            margin-bottom: 4rem;

            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1rem 1rem;
        }
    }

    main > section {
        margin: 0px 8vw;
    }
</style>