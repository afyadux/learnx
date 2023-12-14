


<script lang="ts">
    import Icon from "$lib/interface/Icon.svelte";
    import Textfield from "$lib/interface/Textfield.svelte";
</script>


<main>
    <section id="type">
        <p>Student</p>
    </section>

    <section id="account">
        <div class="profile">

            <div class="icons">
                <div class=""><img src="/icons/instructor.png" alt=""></div>

                <div>
                <Icon>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.27 12C2.48 11.05 2 9.83 2 8.5C2 5.48 4.47 3 7.5 3H12.5C15.52 3 18 5.48 18 8.5C18 11.52 15.53 14 12.5 14H10" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20.73 12C21.52 12.95 22 14.17 22 15.5C22 18.52 19.53 21 16.5 21H11.5C8.48 21 6 18.52 6 15.5C6 12.48 8.47 10 11.5 10H14" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>                        
                </Icon>
                </div>

                <div class=""><img src="/icons/profile.png" alt=""></div>

                <h4>Wunsche High</h4>
            </div>


            <div class="name">
                <h2>Jean-Paul</h2>
                <h1>Metoyer</h1>
            </div>



        </div>

        <div class="progress">
        { #each Array(4) as _ }
            <div>
                <h4>Lessons</h4>
                <h2>12</h2>
            </div>
        {/each }
        </div>
    </section>



    <section id="auth">

        <div class="inputs">
            
        </div>
    </section>
    

</main>

<style lang="scss">

    @use "$lib/interface/variables" as app;
    
    main {
        padding-top: 5rem;
    }


    section#type {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        padding: 0px 8vw;
        margin-top: 3rem;
        margin-bottom: 1rem;

        p {
            position: relative;
            padding: 0.3rem 1rem;
            border-radius: 0.5rem;

            &::after {
                position: absolute;
                top: 0px;
                bottom: 0px;
                left: 0px;
                right: 0px;

                content: "";
                z-index: -1;
                background-color: app.$color-shade;
                opacity: 30%;
                border-radius: 1rem;
            }
        }
    }

    section#account {
        padding: 0px 8vw;

        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        gap: 1rem 4vw;


        div {
            // border: 1px solid gray;
        }

        div.profile {

            div.icons {
                display: grid;
                grid-template-columns: 8rem 4rem 8rem;
                grid-template-rows: 8rem 1.5rem;
                gap: 1rem 0px;
            }

            div.icons > div:nth-child(2) {
                display: flex;
                align-items: center;
                justify-content: center;
                fill: transparent;
            }

            div.icons > h4 {
                grid-column: span 3;
                font-weight: app.$weight-semibold;
                color: app.$color-midground;
            }

            div.name {
                margin: 2rem 0px;
                gap: 0.5rem;

                display: flex;
                flex-direction: column;
                justify-content: flex-start;

                > *:nth-child(1) {
                    font-size: 170%;
                }

                > *:nth-child(2) {
                    font-size: 240%;
                }
            }

        }


        div.progress {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: max-content max-content;
            gap: 1rem 1rem;

            margin: auto 0px;

            > div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 0.5rem;
                padding: 1rem 1rem;

                border: 1px dashed #aaaab2;
                border-radius: 0.5rem;
            }
        }
    }


    section#auth {
        margin: 0px 8vw;

        display: flex;
        flex-direction: column;
        align-items: center;

        div.inputs {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0px 1rem;

            max-width: 1080px;
            width: 100%;
        }
    }

</style>


