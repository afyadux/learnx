

<style lang="scss">

    @use "$lib/interface/variables" as app;


    .social {
        width: 100%;
        margin-top: 15px;
        display: flex; 
        align-items: center; 
        justify-content: center; 
        padding: 5px 10px; 
        gap: 10px; 
        background-color: white;
        font-size: 16px;
        color: grey;
        border: 1px solid lightgrey;
        border-radius: .5rem;


        &:disabled {
            background-color: app.$color-shade;
        }

        &:hover {
            background-color: app.$color-foreground;
            color: app.$color-background;

        }

    }

    .social img {
        width: 2.5rem; 
        height: auto; 
    }
</style>

<script lang="ts">
    export let socialIcon: string;
    export let text: string;
    export let disabled = false;
    export let onClickAction: () => void;
</script>


<button on:click={ onClickAction } disabled={ disabled } class="social drop-shadow">
    <img src={ socialIcon } alt="">
    {  text }
</button>

