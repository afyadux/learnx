

<script lang="ts">

    export let value: string;
    export let placeholder: string = "This is the placeholder"; 

    export let editable = false;
    export let type: "paragraph" | "h1" | "h4" | "h6" | "h2" = "paragraph";
    export let onFinishEdit : () => void = () => { }; 

    const onSetEditable = (node: HTMLElement) => {
        node.setAttribute("contenteditable", `${ editable }`);
    }   
</script>

<style lang="scss">
    @use "$lib/interface/variables" as app;
    

    *[contenteditable] {
        cursor: pointer;

        &:empty { 
        }

        &:empty:before {
            content: var(--placeholder);
            color: app.$color-midground;
        }
    }
    
    
    
</style>

{ #if type === "paragraph"}
    <p style={ `--placeholder: "${ placeholder }"` } use:onSetEditable bind:innerText={ value } on:blur={ onFinishEdit } contenteditable></p>

{ :else if type === "h1"}
    <!-- svelte-ignore a11y-missing-content -->
    <h1 style={ `--placeholder: "${ placeholder }"` } use:onSetEditable bind:innerText={ value } on:blur={ onFinishEdit } contenteditable></h1>

    { :else if type === "h2"}
    <!-- svelte-ignore a11y-missing-content -->
    <h2 style={ `--placeholder: "${ placeholder }"` } use:onSetEditable bind:innerText={ value } on:blur={ onFinishEdit } contenteditable></h2>

{ :else if type === "h4"}
    <!-- svelte-ignore a11y-missing-content -->
    <h4 style={ `--placeholder: "${ placeholder }"` } use:onSetEditable bind:innerText={ value } on:blur={ onFinishEdit } contenteditable></h4>

{ :else if type === "h6"}
    <!-- svelte-ignore a11y-missing-content -->
    <h6 style={ `--placeholder: "${ placeholder }"` } use:onSetEditable bind:innerText={ value } on:blur={ onFinishEdit } contenteditable></h6>
{/if }

