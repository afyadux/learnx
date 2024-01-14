

<script lang="ts">
    import Editable from "$lib/interface/Editable.svelte";
    import type { QuizQuestion, StudentTest } from "$lib/models/app";
    import { user } from "$lib/functions/authentication";

    export let test: StudentTest | undefined = undefined;
    export let question: QuizQuestion;
    export let index : number;
    export let updateQuestion : (_question: QuizQuestion, _answer: number, _index: number) => Promise<void>;

    const numberToAlpha = (index: number) => {
        if (index === 3) { return "D" }
        if (index === 2) { return "C" }
        if (index === 1) { return "B" }
        else { return "A" }
    }
    
    const { prompt, choices, correct } = question;

    let promptUI: string = prompt;
    let choicesUI: string[] = choices;
    let correctUI: number = correct;

    let answer: number = test ? test.answers[index] : -1;

    const update = () => {
        updateQuestion({ prompt: promptUI, choices: choicesUI, type: "text", correct: correctUI }, answer, index);
    }
</script>


{#if false }
    <div class="prompt">
       
    </div>
{:else}
    <div class="question">
        <p id="index">{ index + 1 }</p>

        <Editable
            editable={ $user.role !== "student" }
            bind:value={ promptUI }
            onFinishEdit={ update }
            placeholder="Question { index +1  } prompt ..."
        />

        <div class="choices">
        { #each choicesUI as _, index }
            <button class={ answer === index ? "chosen" : "" } id="choice" on:click={ () => { if ($user.role === "student" && !test?.submitted) { answer = index; update() }}}>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <span on:click={ () => { correctUI = index; update() }}>{ numberToAlpha(index) }</span>
            <Editable bind:value={ choicesUI[index] } editable={ $user.role !== "student" } onFinishEdit={ update } placeholder="Answer Choice { numberToAlpha(index) }"/>
                { #if $user.role !== "student" && index === correctUI }
                    <h6>Correct</h6>
                {/if }
            </button>
        {/each}
        </div>
    </div>
{/if}


<style lang="scss">

    @use "$lib/interface/variables" as app;


    div.question {
        position: relative;
        max-width: 840px;

        display: flex;
        flex-direction: column;
        gap: 1rem;

        margin: 0px auto 3rem auto;
        padding-left: 2rem;

        p#text {
            width: 100%;
        }


        p#index {
            position: absolute;
            top: 0px;
            left: 0.5rem;
            color: app.$color-midground;
        }

        &:nth-last-child(2) {
            margin: 0px auto 0px auto;
        }
    }

    div.prompt {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        > p { font-style: italic; }
    }


    textarea {
        resize: vertical;
        padding: 0.6rem 0.8rem;
        background-color: transparent;
        border-radius: 0.6rem;
        width: 100%;
        border: 1px solid app.$color-shade;
    }

    div.choices {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;


        button#choice {
            padding: 0.5rem 0.5rem;
            border: 1px solid app.$color-shade;
            border-radius: 0.5rem;

            display: grid;
            grid-template-columns: max-content auto max-content;
            grid-template-rows: 1fr;
            gap: 0px 0.8rem;

            background-color: transparent;

            width: 100%;

            &.chosen {
                background-color: app.$color-foreground;
                *, :global(p) {
                    color: app.$color-background !important;
                    stroke: app.$color-background !important;
                }
            }


            span {
                width: 1.5rem;
                height: 1.5rem;
                border-radius: 1.5rem;
                border: 1px solid app.$color-midground;
                color: app.$color-midground;

                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 80%;

                &:hover {
                    background-color: app.$color-info;
                    color: white;
                }
            }

            :global(> p) { padding-right: 1rem; text-align: left; }

            h6 { background-color: app.$color-info;
                color: white;
                padding: 0.1rem 0.8rem;
                border-radius: 1rem; }
        }
    }
</style>

