




<script lang="ts">
</script>

<main>
    <section id="prompt">
        <slot></slot>
    </section>
</main>

<style lang="scss">
    @use "$lib/interface/variables" as app;


    main {
        min-height: calc(100vh - 10rem);
        display: flex;
        justify-content: center;
        align-items: center;

        padding-top: 4rem;  

        @media screen and (max-width: 640px) {
            padding: 4rem 5vw 0px 5vw;

            #prompt {
                padding: 0rem 0rem;
                margin: 3rem 0px 2rem 0px;
                border: none;
            }
        }
    }


    #prompt {
        border-radius: 0.5rem;
        border: 1px solid app.$color-shade;
        height: max-content;
        width: 100%;
        max-width: 540px;
        margin: 1rem;

        padding: 2rem 2rem;

        :global(> div) {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        :global(div > label) {
            align-self: flex-start;
            font-size: 17px;
        }

        :global(div > div#labels) {
            margin-top: 1rem;
            margin-bottom: 5px;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        :global(div > div#labels a) {
            font-size: 12px;
            color: rgb(26,115,232);
        }

        :global(#cta) {
            margin-top: 1rem;
            width: 100%;
            border: .1rem;

            &:hover {
                background-color: rgb(163, 23, 23);
                transition: all 240ms ease-in-out;
            }
        }

        :global(#other) {
            margin-top: 15px;
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            width: 100%;
            gap: 1rem;
        }

        :global(#other > span.border) {
            position: relative;
            bottom: 12px;
            border-bottom: 1px solid lightgrey;
        }

        :global(#other > span#text) {
            color: grey;
            font-size: 14px;
        }
    }  
</style>



