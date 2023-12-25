


<script lang="ts">

    export let error = "jadsfasd";

    export let id = "";
    export let bindingGroup: string;
    export let fill: boolean = false;

    /** All options must have unique identifiers */
    export let options: string[] = ["option1", "option2"];
    export let onTabbarChange : () => void = () => { };


</script>

<div class={ error.length > 0 ? "tabbar error" : "tabbar" } style={ fill? "width: 100%" : "width: max-content" }  id={ id }>    
    { #each options as text }
    <input on:change={ onTabbarChange } bind:group={ bindingGroup } type="radio" id={ text.toLowerCase() } value={ text.toLocaleLowerCase() }>
    <label for={ text.toLocaleLowerCase() }>{ text[0].toUpperCase() }{ text.slice(1).toLocaleLowerCase() }</label>
    {/each }

    <p id="error">{ error }</p>
</div>



<style lang="scss">
    @use "$lib/interface/variables" as app;

    div.tabbar {
        position: relative;

        display: flex;
        flex-direction: row;
        gap: 0.5rem;

        margin: 0rem auto;

        padding: 0.4rem 0.4rem 0.4rem 0.4rem;
        background-color: app.$color-elevate;
        border-radius: 0.8rem;


        p#error {
            opacity: 0%;

            position: absolute;
            bottom: -1.6rem;
            left: 0rem;
            right: 0px;

            text-align: start;

            color: app.$color-error;
            font-size: 0.8rem;
            margin: 0.1rem 0px;

            transition-property: opacity;
            transition-duration: 200ms;
            transition-timing-function: linear;
        }

        &.error {
            margin-bottom: 1.5rem;
            border: 1px solid app.$color-error;
        }


        &.error p#error {
            opacity: 100%;
        }

        label {
            flex-grow: 1;
            text-align: center;
            padding: 0.4rem 1rem;

            border-radius: 0.5rem;
            color: app.$color-midground;
            cursor: pointer;
            
        }

        input:checked + label {
            color: app.$color-info;
            font-weight: app.$weight-semibold;
            box-shadow: 0 0 1.5rem #282a3614;
        }

        input { display: none; }
    }
</style>

