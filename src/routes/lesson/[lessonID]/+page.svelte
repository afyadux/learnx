

<script lang="ts">
    import Question from "$lib/cards/question.svelte";
    import { database } from "$lib/firebase/app";
    import Editable from "$lib/interface/Editable.svelte";
    import Icon from "$lib/interface/Icon.svelte";
    import Tabbar from "$lib/interface/Tabbar.svelte";
    import { ideaType, type QuizQuestion, type lessonData } from "$lib/models/app";
    import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
    import type { PageData } from "../$types";
    import { page } from "$app/stores";

    export let data: lessonData;
    const { title, postDate, quiz, courseID } = data;
    const { lessonID } = $page.params;


    let titleUI: string = title;
    let quizUI: QuizQuestion[] = quiz;

    async function addQuestion() {
        const updatedQuiz: QuizQuestion[] = [...quizUI, {
            prompt: "",
            type: "",
            choices: ["", "", "", ""],
            correct: 0
        }];

        await updateDoc(doc(database, "lesson", lessonID), {
            quiz: updatedQuiz
        });

        quizUI = updatedQuiz;
    }

    async function questionUpdate(value: QuizQuestion, index: number) {

        const updated = [...quizUI.slice(0, index), value , ...quizUI.slice(index + 1)];
        await updateDoc(doc(database, "lesson", lessonID), {
            quiz: updated
        });

        quizUI = updated;
    }

    let ideas = [
        { type: ideaType.text, data: "A chemical bond is a lasting attraction between atoms or ions that enables the formation of molecules, crystals, and other structures. The bond may result from the electrostatic force between oppositely charged ions as in ionic bonds, or through the sharing of electrons as in covalent bonds. The strength of chemical bonds varies considerably; there are strong bonds such as covalent, ionic and metallic bonds, and weak bonds or secondary bonds such as dipole interactions, the London dispersion force, and hydrogen bonding." },
        { type: ideaType.text, data: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit repudiandae minima minus vitae, dolor velit nemo perferendis quidem assumenda magnam eius maxime porro, eos cupiditate atque quod iusto similique! Quam officia consectetur, sapiente et deserunt ullam ab aut doloremque culpa consequuntur? Facere dolor deserunt quod repellat eveniet suscipit." },
        { type: ideaType.video, data: "/sample.mp4" },
        { type: ideaType.text, data: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit repudiandae minima minus vitae, dolor velit nemo perferendis quidem assumenda magnam eius maxime porro, eos cupiditate atque quod iusto similique! Quam officia consectetur, sapiente et deserunt ullam ab aut doloremque culpa consequuntur? Facere dolor deserunt quod repellat eveniet suscipit." },
        { type: ideaType.text, data: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit repudiandae minima minus vitae, dolor velit nemo perferendis quidem assumenda magnam eius maxime porro, eos cupiditate atque quod iusto similique! Quam officia consectetur, sapiente et deserunt ullam ab aut doloremque culpa consequuntur? Facere dolor deserunt quod repellat eveniet suscipit." },
    ];


    let stageView: string = "quiz"; 

    $: choices = [2];
    $: translate = (stageView === "lesson") ? 0 : 100;

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

            <Editable
                bind:value={ titleUI }
                type="h1"
                placeholder="This Lesson's Title ..."

            />

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
        
                    <p>Posted { postDate.toDate().toLocaleString() }</p>
                </div>
            </div>
        </section>

    </article>
    

    <article id="stage">
        <Tabbar bind:bindingGroup={ stageView } />
    </article>
    
    <article id="lesson">
        <section id="ideas" style="display: { (stageView === "lesson") ? "flex" : "none" };">
        { #each ideas as idea, index }
            <div class="idea">
            {#if idea.type === ideaType.text }
                <p>{ idea.data }</p>
            {:else if idea.type === ideaType.video }
                <video controls>
                    <source src={ `/videos/${ idea.data }` } type="video/mp4">
                    <track kind="captions">
                </video>
            {/if }
            </div>
        {/each }
        </section>


        <section id="quiz" style="display: { (stageView === "quiz") ? "block" : "none" };">
            { #each quizUI as question, index }
                <Question updateQuestion={ questionUpdate } question={ question } index={ index } />
            {/each }

            <button class="add" on:click={ addQuestion }>
                <div class="icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.3033 16.9099L16.9099 6.30327M6.3033 6.30327L16.9099 16.9099" stroke="#363853" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </div>

                <h5>Add Question</h5>
            </button>

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

        button.add {
            border: 1px dashed app.$color-shade;
            border-radius: 1rem;
            background-color: transparent;
            padding: 1rem 0px;

            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            gap: 1rem;

            h5 { color: app.$color-midground; }

            

            div.icon {
                width: 3rem;
                height: 3rem;
                stroke: app.$color-foreground;
                transform: rotateZ(45deg);
                border: 1px dashed app.$color-shade;
                border-radius: 10rem;

                transition-property: all;
                transition-duration: 300;
                transition-timing-function: linear;
                

                svg {
                    height: 60%;
                    width: 60%;
                }
            }

            &:hover div.icon {
                background-color: app.$color-background;
                box-shadow: 0 0 1.5rem #282a3614;
                border: 1px solid transparent;
            }
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

                :global(h1) {
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
        }

        section#quiz {
            width: 100vw;

            div.submit {
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 2rem 0px 8rem 0px;
            }

            button.add {
                margin: 0px auto;
                width: 100%;
                max-width: 500px;
            }
        }
    }

    


</style>

