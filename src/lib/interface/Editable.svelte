

<script lang="ts">

    export let value: string;
    export let placeholder: string = "This is the placeholder"; 

    export let editable = false;
    export let type: "paragraph" | "h1" | "h6" = "paragraph";
    export let onFinishEdit : () => void = () => { }; 

    const onSetEditable = (node: HTMLElement) => {
        node.setAttribute("contenteditable", `${ editable }`);

        if (editable) {
            node.setAttribute("contenteditable", `${ editable }`)
        } else {
            node.removeAttribute("contenteditable");
        }
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
    <h1 style={ `--placeholder: "${ placeholder }"` } use:onSetEditable bind:innerText={ value } on:blur={ onFinishEdit } contenteditable>&nbsp;</h1>

{ :else if type === "h6"}
    <h6 style={ `--placeholder: "${ placeholder }"` } use:onSetEditable bind:innerText={ value } on:blur={ onFinishEdit } contenteditable>&nbsp;</h6>
{/if }

