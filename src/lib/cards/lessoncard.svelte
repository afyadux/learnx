



<a href="/" class="lesson">

    <div class="lead">
        <!-- <p>0% complete</p> -->
        <p>#1</p>
        <button>Delete</button>
    </div>

    <div class="trail">
        <h4>Determining an emperical formula from percent composition data</h4>
        <p>5 min read</p>
        <p>15 Questions</p>
    </div>
</a>

<style lang="scss">

    @use "$lib/interface/variables" as app;


    a.lesson {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        
        padding: 0.8rem 1rem;
        border: 1px solid orange;
        border-radius: 0.8rem;

        background-color: app.$color-background;
        border: 1px solid app.$color-shade;

        transition-property: all;
        transition-duration: 150ms;
        transition-timing-function: ease-in;

        &:hover {
            border: 1px dashed transparent;
            box-shadow: 0 0 1.5rem #282a3614;
        }

        div.lead {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0px 0.5rem;

            button {
                padding: 0px;
                height: max-content;
                width: max-content;
                margin-left: auto;
                background-color: transparent;
                color: app.$color-midground;

                &:hover {
                    color: app.$color-error;
                }
            }

            > *:nth-child(2) {
                text-align: end;
            }
        }

        div.trail {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: max-content max-content;
            gap: 0.2rem 0.5rem;

            h4 { grid-column: span 2; font-weight: app.$weight-semibold; }
            p { color: app.$color-midground }
            > p:nth-child(3) { text-align: end; }
        }
    }
</style>

