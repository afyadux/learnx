


<script lang="ts">
    import Coursecard from "$lib/cards/coursecard.svelte";
import Usercard from "$lib/cards/usercard.svelte";
import AuthSection from "$lib/sections/authSection.svelte";


</script>

<main id="admin">
    <section id="type">
        <p>Administrator</p>
    </section>

    <section id="institution">
        <div class="image"><img src="/images/caltech.png" alt=""></div>
        <div class="info">
            <h3>California Institute of Technology</h3>
            <p>120 students &middot; 30 teachers &middot; 13 courses</p>
        </div>
    </section>

    <AuthSection />

    <section id="pending">
        <h3>Welcome back, Alfred</h3>
        <p>Pending student & teacher join requests</p>

        <div class="grid">
        { #each Array(6) as _, index }
            <Usercard  approvals={ true } />
        {/each }
        </div>

        <div class="action">
            <button class="tertiary">Approve All</button>
        </div>
    </section>

    <section id="course-catalogue">
        <h3>Institutional Course Catalogue</h3>

        <div class="grid">
        { #each Array(6) as _, index }
            <Coursecard />
        {/each }
        </div>

        <div class="action">
            <button class="tertiary">See All</button>
        </div>
    </section>

    <section id="teachers">
        <h3>Teachers</h3>

        <div class="grid">
            { #each Array(6) as _, index }
                <Usercard />
            {/each }
            </div>
    
            <div class="action">
                <button class="tertiary">See All</button>
            </div>
    </section>

    <section id="students">
        <h3>Students</h3>

        <div class="grid">
            { #each Array(6) as _, index }
                <Usercard />
            {/each }
            </div>
    
            <div class="action">
                <button class="tertiary">See All</button>
            </div>
    </section>
</main>

<style lang="scss">
    @use "$lib/interface/variables" as app;


    main {
        padding-top: 5rem;
        min-height: calc(100vh  - 12rem);

        > :global(section) {
            margin: 0px 5vw 2rem 5vw;
        }

        > section {

            div.action {
                display: flex;
                align-items: center;
                justify-content: center;

                margin-top: 1.5rem;
            }

            div.grid {
                margin-top: 1rem;

                display: grid;
                
            }
        }

        

    }

    section#type {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        margin-bottom: 1rem;

        p {
            position: relative;
            padding: 0.3rem 1rem;
            border-radius: 0.5rem;

            &::after {
                position: absolute;
                top: 0px;
                bottom: 0px;
                left: 0px;
                right: 0px;

                content: "";
                z-index: -1;
                background-color: app.$color-shade;
                opacity: 30%;
                border-radius: 1rem;
            }
        }
    }


    section#institution {
        display: grid;
        grid-template-columns: 8rem auto;
        grid-template-rows: 8rem;
        gap: 1rem 2rem;

        > div.image {
            border-radius: 1.5rem;
            border: 3px solid app.$color-shade;
            overflow: hidden;
        }

        div.info {
            display: flex;
            flex-direction: column;
            justify-content: flex-start; 
            gap: 1rem;
            height: max-content;
            margin: auto 0px;;
            
            h3 { font-size: 200%; font-weight: app.$weight-semibold; font-family: app.$typeface-heading; }
        }
    }

    section#pending,
    section#students,
    section#teachers {

        p { margin: 0.2rem 0px 1.5rem 0px; }

        div.grid {
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 1rem 1rem;
        }
    }

    section#course-catalogue {


        div.grid {
            grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
            gap: 1rem 1rem;
        }
    }

</style>


