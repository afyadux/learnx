

<style lang="scss">

    #social {
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


    }

    #social:hover {
        background-color: lightgray;
        transition: 140ms all ease-in-out;
    }

    #social img {
        width: 2.5rem; 
        height: auto; 
    }
</style>

<script lang="ts">
    export let socialIcon: string;
    export let text: string;
</script>


<button id="social">
    <img src={ socialIcon } alt="">
    {  text }
</button>

