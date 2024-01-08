


<script lang="ts">
    import Editable from "$lib/interface/Editable.svelte";
    import type { LessonIdea } from "$lib/models/app";

    export let data: LessonIdea;
    export let index: number;
    export let updateIdea : (_value: LessonIdea, _index: number) => Promise<void>;

    const { type, value } = data;

    let valueUI: string = value;

    const update = () => {
        updateIdea({ value: valueUI, type: "text" }, index);
    }
</script>

<div class="idea" id={ index.toString() }>
{#if type === "text" }
    <Editable
        editable={ true }
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
        max-width: 800px;
        width: 100%;
    }

    div.idea video {
        width: 100%;
        border-radius: 1rem;
    }
</style>


