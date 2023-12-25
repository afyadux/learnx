

<script lang="ts">
    import Icon from "$lib/interface/Icon.svelte";
    import Tabbar from "$lib/interface/Tabbar.svelte";
    import { ideaType } from "$lib/models/lesson";


    let ideas = [
        { type: ideaType.text, data: "A chemical bond is a lasting attraction between atoms or ions that enables the formation of molecules, crystals, and other structures. The bond may result from the electrostatic force between oppositely charged ions as in ionic bonds, or through the sharing of electrons as in covalent bonds. The strength of chemical bonds varies considerably; there are strong bonds such as covalent, ionic and metallic bonds, and weak bonds or secondary bonds such as dipole interactions, the London dispersion force, and hydrogen bonding." },
        { type: ideaType.text, data: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit repudiandae minima minus vitae, dolor velit nemo perferendis quidem assumenda magnam eius maxime porro, eos cupiditate atque quod iusto similique! Quam officia consectetur, sapiente et deserunt ullam ab aut doloremque culpa consequuntur? Facere dolor deserunt quod repellat eveniet suscipit." },
        { type: ideaType.video, data: "/videos/sample.mp4" },
        { type: ideaType.text, data: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit repudiandae minima minus vitae, dolor velit nemo perferendis quidem assumenda magnam eius maxime porro, eos cupiditate atque quod iusto similique! Quam officia consectetur, sapiente et deserunt ullam ab aut doloremque culpa consequuntur? Facere dolor deserunt quod repellat eveniet suscipit." },
        { type: ideaType.text, data: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit repudiandae minima minus vitae, dolor velit nemo perferendis quidem assumenda magnam eius maxime porro, eos cupiditate atque quod iusto similique! Quam officia consectetur, sapiente et deserunt ullam ab aut doloremque culpa consequuntur? Facere dolor deserunt quod repellat eveniet suscipit." },
    ];


    let stageView: string = "quiz"; 

    $: translate = (stageView === "lesson") ? 0 : 100;
    $: choices = [2];

    let successfulYear: string;
    $: submittable = 
        
        (successfulYear != "") && (successfulYear != undefined)
       
        ; 


    const submitForm = () => {

    }

    let openEnded = true;


    
</script>



<main>

    <article id="hero">
        <img class="background" src="/images/thunderhead.jpeg" alt="">

        <section class="info">
            <img src="/images/thunderhead.jpeg" alt="">
            <h1>Determining Emperial Formulas from Percent Composition Data</h1>

            <div class="detail">
        
                <div class="chip">
                    <Icon frame={[1.2,1.2]}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 2V5"  stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 2V5"  stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3.5 9.08984H20.5"  stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"  stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15.6947 13.7002H15.7037"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15.6947 16.7002H15.7037"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11.9955 13.7002H12.0045"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11.9955 16.7002H12.0045"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.29431 13.7002H8.30329"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.29431 16.7002H8.30329"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>                    
                    </Icon>
        
                    <p>Posted Wednesday &middot; Mar 21, 2023 &middot; 11:59 PM</p>
                </div>
            </div>
        </section>

    </article>
    

    <article id="stage">
        <Tabbar bindingGroup={ stageView } />
    </article>
    
    <article id="lesson">
        <section id="ideas" style={ `transform: translateX(${ -translate }vw);` }>
        { #each ideas as idea, index }
            <div class="idea">
            {#if idea.type === ideaType.text }
                <p>{ idea.data }</p>
            {:else if idea.type === ideaType.video }
                <video controls>
                    <source src={ idea.data } type="video/mp4">
                    <track kind="captions">
                </video>
            {/if }
            </div>
        {/each }
        </section>
    
        <section id="quiz" style={ `transform: translateX(${ -translate + 100 }vw);` }>


            {#if openEnded}
            <div class="prompt">
                <p>Explain the concept of Le Chatelier's Principle and how it applies to chemical equilibrium. Describe a scenario where a change in concentration, temperature, or pressure would shift the equilibrium of a reaction. Illustrate your explanation with a specific chemical reaction, detailing how these changes affect the position of equilibrium and the concentrations of reactants and products.</p>
                <textarea name="" bind:value={successfulYear} id="textInput"    placeholder="Le Chatelier's Principle states that when a dynamic equilibrium is disturbed by changing the conditions, the system adjusts to restore equilibrium. For example, in the reaction..."></textarea>
              

              </div>

            {:else}

            { #each Array(5) as _, index }
            <div class="question">
                <p id="index">{ index + 1 }</p>
    
                <p id="text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus totam blanditiis sed sunt magnam nobis ab illo, esse quas tempora eaque? Cumque ipsa veritatis nobis asperiores molestias sunt distinctio libero doloribus autem!</p>
    
                <div class="choices">
                    <label for="">
                        <span>1</span>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </label>
                    <label for="">
                        <span>1</span>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </label>
                    <label for="">
                        <span>1</span>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </label>
                    <label for="">
                        <span>1</span>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </label>
                </div>
            </div>
            {/each }

            {/if}
        <div class="submit">
            <button>Submit Quiz</button>
        </div>
        </section>
    </article>
</main>



<style lang="scss">
    @use "$lib/interface/variables" as app;

    main {

        div.chip {
            fill: transparent;
            stroke: app.$color-foreground;

            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.5rem;
        }

        > * {
            width: 100%;
            max-width: app.$max-width;
            margin: 0px auto;

        }


        article#hero {
            position: relative;
            padding: calc(12vh + 4rem) 0px 3rem 0px;
            overflow: hidden;

            max-width: unset;

            &::before {
                content: "";
                z-index: -1;

                position: absolute;
                bottom: 0px;
                left: 0px;
                right: 0px;
                height: 100%;
                background: linear-gradient(180deg, transparent, app.$color-shade);


            }

            > img.background {
                position: absolute;
                z-index: -2;

                width: 100vw;
                max-height: unset;

                bottom: 0px;
                filter: blur(3rem);
                opacity: 80%;
            }


            section.info {

                z-index: 2;
                padding: 2rem 5vw 1rem 5vw;

                * { z-index: 2; color: app.$color-foreground; stroke: app.$color-foreground; }

                > h1 {
                    font-size: 210%;
                    font-family: app.$typeface-heading;
                    margin-bottom: 0.5rem;
                    margin-top: 1rem;

                    z-index: 2;
                }

                > img {
                    width: 9rem;
                    height: 16rem;
                    object-fit: contain;
                }
    

    
                div.detail {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 1rem;
                }
            }




        }


        article#stage {

            position: sticky;
            top: 3rem;

            margin-top: 1rem;
            z-index: 3;
            background-color: app.$color-background;
            padding: 1rem 0px 0.5rem 0px;

            
        }

        article#lesson {
            position: relative;
            overflow: hidden;

            display: flex;
            flex-direction: row;
            padding-top: 2rem;

            section {
                transition-property: transform;
                transition-duration: 600ms;
                transition-timing-function: ease-in;
            }

            section#ideas {
                position: absolute;
                width: 100%;

                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 2vmax;

                padding-bottom: 6rem;
                padding-top: 1rem;

                p {
                    color: app.$color-tint;
                }

                div.idea {
                    max-width: 800px;
                }

                div.idea video {
                    width: 100%;
                    border-radius: 1rem;
                }
            }

            section#quiz {
                width: 100vw;
                transform: translateX(100vw);

                // border: 1px solid orange;

            }
        }

        section#quiz {


            div.question {
                position: relative;
                max-width: 840px;

                display: flex;
                flex-direction: column;
                gap: 1rem;

                margin: 0px auto 3rem auto;
                padding-left: 2rem;

                p#text {
                    width: 100%;
                }


                p#index {
                    position: absolute;
                    top: 0px;
                    left: 0.5rem;
                    color: app.$color-midground;
                }

                &:nth-last-child(2) {
                    margin: 0px auto 0px auto;
                }
            }

            div.choices {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;


                label {
                    padding: 0.5rem 0.5rem;
                    border: 1px solid app.$color-shade;
                    border-radius: 0.5rem;

                    display: grid;
                    grid-template-columns: max-content auto;
                    grid-template-rows: 1fr;
                    gap: 0px 0.8rem;

                    span {
                        width: 1.5rem;
                        height: 1.5rem;
                        border-radius: 1.5rem;
                        border: 1px solid app.$color-shade;

                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 80%;
                    }

                    p { padding-right: 1rem; }
                }
            }

            div.submit {
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 2rem 0px 8rem 0px;
            }
        }
    }

    div.prompt {
                display: flex;
                flex-direction: column;
                gap: 1rem;

                > p { font-style: italic; }
            }


            textarea {
                resize: vertical;
                padding: 0.6rem 0.8rem;
                background-color: transparent;
                border-radius: 0.6rem;
                width: 100%;
                border: 1px solid app.$color-shade;
            }


</style>

