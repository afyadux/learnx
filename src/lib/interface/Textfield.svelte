
<script lang="ts">
    import Icon from "./Icon.svelte";

    export let value: string = "";
    export let editable: boolean = true;
    export let placeholder: string = "";
</script>

<div class="textfield">
    <input
        style={ `padding: 0.6rem ${ ($$slots.action) ? 2.5 : 1 }rem 0.6rem ${ ($$slots.icon || $$slots.default) ? 2.5 : 1 }rem` }
        type="text" placeholder={ placeholder } readonly={ !editable } bind:value={ value }>

    <div class="marker">
        <slot name="icon"></slot>
        <slot></slot>         
    </div>

    <div class="action">
        <slot name="action"></slot>            
    </div>
</div>

<style lang="scss">

    @use "$lib/interface/variables" as app;

    div.textfield {
        position: relative;
        flex-grow: 1;
        width: 100%;
        height: max-content;

        input {

            border-radius: 0.5rem; 
            border: 1px solid app.$color-shade;
            background-color: app.$color-elevate;

            width: 100%;
            height: 100%;

            &::placeholder {
                color: app.$color-midground; 
            }

            &:focus {
                border: 0.8px solid app.$color-info; 
                outline: none;
            }
        }


        div.marker, div.action {
            position: absolute;
            left: 0px;
            top: 0px;
            bottom: 0px;

            fill: transparent;
            stroke: app.$color-tint;

            margin: 0.1rem 0.8rem 0px 0.8rem;

            > :global(button) {
                width: 1.3rem !important;
                height: 1.3rem !important;
            }
        }

        div.action {


            right: 0px;
            left: unset;

            display: flex;
            flex-direction: flex-end;
            align-items: center;
            gap: 0.5rem;
        }


    }
</style>

