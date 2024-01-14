

<script lang="ts">
    import Editable from "$lib/interface/Editable.svelte";
    import type { lessonData } from "$lib/models/app";
    import { DateTime } from "luxon";
    import type { Timestamp } from "firebase/firestore";



    export let disabled = false;
    export let index: number = 1;
    export let lesson: lessonData;
    export let consumer: boolean = true;
    const { title, id, quiz, postDate } = lesson;



    const { nanoseconds } = postDate as any;    
    const dt = (nanoseconds) ?  DateTime.fromJSDate((postDate as any).toDate()).toRelative() : DateTime.fromJSDate(postDate).toRelative();

</script>


<a href="/lesson/{ id }" class={ disabled ? "disabled lesson drop-shadow" : "lesson drop-shadow" }>

    <div class="lead">
        
        {#if consumer }
        <p>0% complete</p>
        {/if}
        <p>#{ index + 1 }</p>
        
        {#if !consumer }
        <button>Delete</button>
        {/if}
    </div>

    <div class="trail">
        <Editable type="h4" value={title} editable={false} placeholder="Lesson Title ..." />
        <p style="line">{ dt }</p>
        <p>{ quiz.length } Questions</p>
    </div>
</a>

<style lang="scss">

    @use "$lib/interface/variables" as app;


    a.lesson {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        
        padding: 0.8rem 1rem;
        border: 1px solid orange;
        border-radius: 0.8rem;

        border: 1px solid app.$color-shade;

        transition-property: all;
        transition-duration: 150ms;
        transition-timing-function: ease-in;

        &.disabled {
            pointer-events: none;
            cursor: pointer;
        }

        

        div.lead {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0px 0.5rem;

            button {
                padding: 0px;
                height: max-content;
                width: max-content;
                margin-left: auto;
                background-color: transparent;
                color: app.$color-midground;

                &:hover {
                    color: app.$color-error;
                }
            }

            > *:nth-child(2) {
                text-align: end;
            }
        }

        div.trail {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: max-content max-content;
            gap: 0.2rem 0.5rem;

            :global(h4) { grid-column: span 2; font-weight: app.$weight-semibold; height: 3em; }
            p { color: app.$color-midground }
            > p:nth-child(3) { text-align: end; }
        }
    }
</style>

