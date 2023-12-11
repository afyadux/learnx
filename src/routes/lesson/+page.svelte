

<script lang="ts">
    import Icon from "$lib/interface/Icon.svelte";
    import { ideaType } from "$lib/models/lesson";


    let ideas = [
        { type: ideaType.text, data: "A chemical bond is a lasting attraction between atoms or ions that enables the formation of molecules, crystals, and other structures. The bond may result from the electrostatic force between oppositely charged ions as in ionic bonds, or through the sharing of electrons as in covalent bonds. The strength of chemical bonds varies considerably; there are strong bonds such as covalent, ionic and metallic bonds, and weak bonds or secondary bonds such as dipole interactions, the London dispersion force, and hydrogen bonding." },
        { type: ideaType.text, data: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit repudiandae minima minus vitae, dolor velit nemo perferendis quidem assumenda magnam eius maxime porro, eos cupiditate atque quod iusto similique! Quam officia consectetur, sapiente et deserunt ullam ab aut doloremque culpa consequuntur? Facere dolor deserunt quod repellat eveniet suscipit." },
        { type: ideaType.video, data: "/videos/sample.mp4" },
        { type: ideaType.text, data: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit repudiandae minima minus vitae, dolor velit nemo perferendis quidem assumenda magnam eius maxime porro, eos cupiditate atque quod iusto similique! Quam officia consectetur, sapiente et deserunt ullam ab aut doloremque culpa consequuntur? Facere dolor deserunt quod repellat eveniet suscipit." },
        { type: ideaType.text, data: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit repudiandae minima minus vitae, dolor velit nemo perferendis quidem assumenda magnam eius maxime porro, eos cupiditate atque quod iusto similique! Quam officia consectetur, sapiente et deserunt ullam ab aut doloremque culpa consequuntur? Facere dolor deserunt quod repellat eveniet suscipit." },
    ];


    let stageView: string = "lesson"; 

    $: translate = (stageView === "lesson") ? 0 : 100;
    
</script>



<main>
    <article id="inspector">
        <h3 class="subtitle">A dive into how ionic bonds form & their properties</h3>
    
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
    </article>

    <article id="stage">

        <div class="tabbar">
            
            <input bind:group={ stageView } type="radio" id="lesson" value="lesson">
            <label for="lesson">Lesson</label>
            
            <input bind:group={ stageView } type="radio" id="quiz" value="quiz">
            <label for="quiz">Quiz</label>
            
        </div>
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


        article#inspector {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
            margin-top: 0rem;

            .subtitle { font-family: app.$typeface-heading; font-size: 142%; }


            div.detail {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 1rem;
            }


            
        }

        article#stage {



            div.tabbar {

                display: flex;
                flex-direction: row;
                gap: 0.5rem;

                width: 300px;
                margin: 0px auto;

                padding: 0.4rem 0.4rem;
                background-color: app.$color-elevate;
                border-radius: 0.8rem;


                label {
                    flex-grow: 1;
                    text-align: center;
                    padding: 0.4rem 1rem;

                    border-radius: 0.5rem;
                    color: app.$color-midground;
                    
                }

                input:checked + label {
                    color: app.$color-info;
                    font-weight: app.$weight-semibold;
                    box-shadow: 0 0 1.5rem #282a3614;
                }

                input { display: none;}
            }
        }

        article#lesson {
            position: relative;

            display: flex;
            flex-direction: row;

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

                border: 1px solid orange;

            }
        }
    }
</style>

