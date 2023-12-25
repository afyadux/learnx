


<script lang="ts">
    export let id = "";
    export let bindingGroup: string;
    export let fill: boolean = false;

    /** All options must have unique identifiers */
    export let options: string[] = ["option1", "option2"]

</script>

<div style={ fill? "width: 100%" : "width: max-content" } class="tabbar" id={ id }>    
    { #each options as text }
    <input bind:group={ bindingGroup } type="radio" id={ text.toLowerCase() } value={ text.toLocaleLowerCase() }>
    <label for={ text.toLocaleLowerCase() }>{ text[0].toUpperCase() }{ text.slice(1).toLocaleLowerCase() }</label>
    {/each }
</div>



<style lang="scss">
    @use "$lib/interface/variables" as app;

    div.tabbar {

        display: flex;
        flex-direction: row;
        gap: 0.5rem;

        margin: 0rem auto;

        padding: 0.4rem 0.4rem 0.4rem 0.4rem;
        background-color: app.$color-elevate;
        border-radius: 0.8rem;


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

