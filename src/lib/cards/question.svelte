

<script lang="ts">
    import Editable from "$lib/interface/Editable.svelte";
    import type { QuizQuestion } from "$lib/models/app";

    export let question: QuizQuestion;
    export let index : number;
    export let updateQuestion : (_question: QuizQuestion, _index: number) => Promise<void>;

    const numberToAlpha = (index: number) => {
        if (index === 3) { return "D" }
        if (index === 2) { return "C" }
        if (index === 1) { return "B" }
        else { return "A" }
    }


   
    const { prompt, choices } = question;

    let promptUI: string = prompt;
    let choicesUI: string[] = choices;

    const update = () => {
        updateQuestion({ prompt: promptUI, choices: choicesUI, type: "", correct: 0 }, index);
    }
</script>


{#if false }
    <div class="prompt">
       
    </div>
{:else}
    <div class="question">
        <p id="index">{ index + 1 }</p>

        <Editable
        editable={ true }
            bind:value={ promptUI }
            onFinishEdit={ update }
            placeholder="Question { index +1  } prompt ..."
        />

        <div class="choices">
        { #each choicesUI as _, index }
        <label for="">
            <span>{ numberToAlpha(index) }</span>
            <Editable bind:value={ choicesUI[index] } onFinishEdit={ update } placeholder="Answer Choice { numberToAlpha(index) }" editable={ true } />
        </label>
        {/each }
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


        label {
            padding: 0.5rem 0.5rem;
            border: 1px solid app.$color-shade;
            border-radius: 0.5rem;

            display: grid;
            grid-template-columns: max-content auto;
            grid-template-rows: 1fr;
            gap: 0px 0.8rem;

            span {
                width: 1.5rem;
                height: 1.5rem;
                border-radius: 1.5rem;
                border: 1px solid app.$color-shade;

                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 80%;
            }

            p { padding-right: 1rem; }
        }
    }
</style>

