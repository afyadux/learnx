<script lang="ts">

    import Coursecard from "$lib/cards/coursecard.svelte";
    import Lessoncard from "$lib/cards/lessoncard.svelte";
    import type { CourseData, lessonData } from "$lib/models/app";
    import Hero from "$lib/sections/hero.svelte";
    import { user } from "$lib/functions/authentication";

    export let data : { courses: CourseData[], lessons: lessonData[], institutional: CourseData[] }; 
    const { courses, lessons, institutional } = data;

    console.log(data);

</script>

<main>
    <Hero courses={ courses }/>

    <section id="lesson">
        <h4>Jump Back in. </h4>

        <div class="grid" style={ lessons.length === 0 ? "display: block" : "" }>
            { #if lessons.length === 0 }
                <div class="empty" style="margin: 0px auto;">
                    <div class="thumbnail"><img src="/images/empty/learn.png" alt=""></div>
                    <h3>You have not started { $user.role === "student" ? "learning from" : "teaching" } any tutorial lessons</h3>
                    <p style="text-align: center;">{ $user.institution ? `${ $user.institution.name }'s tutorials are found in the "lessons" tab'` : "Join an institution to access tutorials" }</p>
                </div>
            {/if }

            {#each lessons as lesson }
            <Lessoncard lesson={ lesson }  />
            {/each }
        </div>
    </section>


    <section id="course">
        <h4>Explore more courses.</h4>

        <div class="grid" style={ institutional.length === 0 ? "display: block" : "" }>
            { #if institutional.length === 0 }
            <div class="empty">
                <div class="thumbnail"><img src="/images/empty/chill.png" alt=""></div>

                {#if $user.role === "student" }
                    <h3>{ $user.institution ? `${ $user.institution.name } does not offer any courses with tutorials currently` : "Join an institution to enroll in their courses" }</h3>
    
                    { #if $user.institution }
                        <p>Wait for a teacher on your institution to create courses for you to join</p>
                    { :else }
                        <p>Look for institutions to join <a href="/institution">here</a></p>
                    {/if }
                {:else}
                    <h3>Your institution does not offer any courses</h3>
                    <p>Create a new course to teach above for students to enroll in</p>
                {/if}
            </div>
            {/if }

            

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








