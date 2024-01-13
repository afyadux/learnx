


<script lang="ts">
    import Editable from "$lib/interface/Editable.svelte";
    import type { LessonIdea } from "$lib/models/app";
    import { user } from "$lib/functions/authentication";
    import { toRomanNumerals } from "$lib/utilities/math";

    export let data: LessonIdea;
    export let index: number;
    export let updateIdea : (_value: LessonIdea, _index: number) => Promise<void>;

    const { type, value } = data;

    let valueUI: string = value;

    const update = () => {
        updateIdea({ value: valueUI, type: "text" }, index);
    }
</script>

<div class="idea" style={ `--index: "${ toRomanNumerals(index + 1) }"` } id={ index.toString() }>
{#if type === "text" }
    <Editable
        editable={ $user.role !== "student" }
        bind:value={ valueUI }
        onFinishEdit={ update }
        placeholder="Lesson idea for the students to understand ..."
        />
    
{:else if type === "video" }
    <video controls>
        <source src={ `/videos/${ value }` } type="video/mp4">
        <track kind="captions">
    </video>
{/if }
</div>

<style lang="scss">
    @use "$lib/interface/variables" as app;

    p {
        color: app.$color-tint;
        flex-grow: 1;
    }

    div.idea {
        position: relative;
        max-width: 800px;
        width: 100%;

        &::before {
            position: absolute;
            top: 0.2rem;
            left: -3rem;
            content: var(--index);
            height: 1.5em;
            opacity: 50%;
            text-align: end;
            width: 2rem;
        }
    }

    div.idea video {
        width: 100%;
        border-radius: 1rem;
    }
</style>


