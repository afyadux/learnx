

<script lang="ts">
    import Question from "$lib/cards/question.svelte";
    import { database } from "$lib/firebase/app";
    import Editable from "$lib/interface/Editable.svelte";
    import Icon from "$lib/interface/Icon.svelte";
    import Tabbar from "$lib/interface/Tabbar.svelte";
    import type { LessonIdea, QuizQuestion, StudentTest, lessonData } from "$lib/models/app";
    import { Timestamp, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
    import type { PageData } from "../$types";
    import { page } from "$app/stores";
    import Idea from "$lib/cards/idea.svelte";
    import { user } from "$lib/utilities/authentication";
    import { text } from "@sveltejs/kit";
    import { sendNotification } from "$lib/utilities/notifications";
    import { DateTime } from "luxon";

    export let data: lessonData;
    const { title, postDate, quiz, courseID, id, ideas, instructor, quizPublished } = data;
    const { lessonID } = $page.params;


    const dt = DateTime.fromJSDate((postDate as any).toDate()).toLocaleString(DateTime.DATE_HUGE);

    let ideasUI: LessonIdea[] = ideas;
    let titleUI: string = title;
    let quizUI: QuizQuestion[] = (!quizPublished && $user.role === "student") ? [] : quiz;
    let test: StudentTest = { submitted: false, answers: [] }
    let quizPublishedUI : boolean = quizPublished;

    let stageView: string = "lesson";

    $: turnable = 
        (test !== undefined) &&
        (test.submitted == false) &&
        (test.answers.includes(-1) == false);
        


    $: hasEmpty = 
        [...quizUI.map((q) => q.prompt), ...quizUI.flatMap((q) => q.choices)]
        .includes("");


    const getAnswers = async () => {

        if (!user) { return }

        const submission = await getDoc(doc(database, "lesson", lessonID, "submissions", $user.email));
        const { answers, submitted: turnedIn } = submission.data()! as any;
        let answerValues = (quiz.map((_, index) => answers[index] ? answers[index] : -1 ))
        let assessment = {
            submitted: turnedIn,
            answers: answerValues
        }
        
        test = assessment
    }

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

    async function questionUpdate(value: QuizQuestion, userAnswer: number, index: number) {

        if ($user.role === "student") {
            const updatedAnswers = [...test.answers.slice(0, index), userAnswer , ...test.answers.slice(index + 1)];
            await updateDoc(doc(database, "lesson", lessonID, "submissions", $user.email), {
                answers: updatedAnswers
            });

            test = {
                ...test,
                answers: updatedAnswers
            }
        }

        const updated = [...quizUI.slice(0, index), value , ...quizUI.slice(index + 1)];
        await updateDoc(doc(database, "lesson", lessonID), {
            quiz: updated
        });

        quizUI = updated;
    }

    const addIDea = async () => {
        await updateDoc(doc(database, "lesson", lessonID), {
            ideas: [...ideasUI, { type: "text", value: "" }]
        })

        ideasUI = [...ideasUI, { type: "text", value: "" }]
    }

    async function ideaUpdate(value: LessonIdea, index: number) {
        const updated = [...ideasUI.slice(0, index), value , ...ideasUI.slice(index + 1)];
        await updateDoc(doc(database, "lesson", lessonID), {
            ideas: updated
        });

        ideasUI = updated;
    }

    const onFinishEditTitle = async () => {
        await updateDoc(doc(database, "lesson", id), {
            title: titleUI
        });
    }

    const quizSubmitAction = async () => {


        try {
                        
            const notifyTeacher = updateDoc(doc(database, "users", instructor.email), {
                notifications: arrayUnion({ read: false, text: `${ $user.firstName } ${ $user.lastName } (${ $user.email }) has submitted the quiz on ${ titleUI }`, title: "New submission" })
            });

            const submit = updateDoc(doc(database, "lesson", lessonID, "submissions", $user.email), {
                submitted: true
            });

            await Promise.all([submit, notifyTeacher]);
            sendNotification({ type: "success", message: "Successfully turned in assignment" }, 4000);

            test = {
                ...test,
                submitted: true
            }

        } catch (error) {
            console.error(error)
        }
    }

    const publishSubmitAction = async () => {
        try {
            await updateDoc(doc(database, "lesson", lessonID), {
                quizPublished: true
            });

            sendNotification({ type: "success", message: "Successfully published quiz to students" }, 4000);

            quizPublishedUI = true;

        } catch (error) {
            console.error(error)
        }
    }

</script>



<main>

    <article id="hero">
        <img class="background" src="/images/thunderhead.jpeg" alt="">

        <section class="info">
            <div class="cover fill">
                <img src="/images/thunderhead.jpeg" alt="">
            </div>

            <Editable
                editable={ true }
                bind:value={ titleUI }
                type="h1"
                placeholder="This Lesson's Title ..."
                onFinishEdit={ onFinishEditTitle }
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
        
                    <p>Posted { dt }</p>
                </div>
            </div>
        </section>

    </article>
    

    <article id="stage">
        <Tabbar bind:bindingGroup={ stageView } />
    </article>
    
    <article id="lesson">
        <section id="ideas" style="display: { (stageView === "lesson") ? "flex" : "none" };">
        { #each ideasUI as idea, index }
            <Idea updateIdea={ ideaUpdate } data={ idea } index={ index } />
        {/each }

        

        { #if $user.role !== "student" }
        <button on:click={ addIDea } class="add lesson">
            <div class="icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.3033 16.9099L16.9099 6.30327M6.3033 6.30327L16.9099 16.9099" stroke="#363853" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
            </div>
            <h5>Add new point</h5>
        </button>
        {/if }


        </section>


        <section id="quiz" style="display: { (stageView === "quiz") ? "block" : "none" };">
            
            { #if $user.role === "student" }
                { #await getAnswers() }
                    <p>Loading ...</p>
                {:then _ } 
                { #each quizUI as question, index }
                <Question test={ test } updateQuestion={ questionUpdate } question={ question } index={ index } />
                {/each }
                {/await }
            { :else }
                { #each quizUI as question, index }
                <Question updateQuestion={ questionUpdate } question={ question } index={ index } />
                {/each }
            {/if }

            { #if hasEmpty && $user.role !== "student" }
            <div class="error">
                <p>You must add text to all answer choices and prompts to publish quiz to students</p>
            </div>
            {/if }
            

            { #if $user.role !== "student" }
            <button class="add" on:click={ addQuestion }>
                <div class="icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.3033 16.9099L16.9099 6.30327M6.3033 6.30327L16.9099 16.9099" stroke="#363853" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </div>

                <h5>Add Question</h5>
            </button>
            {/if }

            { #if !quizPublishedUI && $user.role === "student" }
            <div class="empty">
                <div class="thumbnail"><img src="/images/empty/test.png" alt=""></div>
                <h3>There is no published quiz for this lesson</h3>
                <p>You can still learn the material anyway, and wait for the instructor to add a quiz</p>
            </div> 
            { /if }



            <div class="submit">
            { #if $user.role === "student" }
                <button style={ `display: ${ quizPublishedUI ? "inline" : "none" }` } disabled={ !turnable } on:click={ () => quizSubmitAction() }>{ (test?.submitted) ? "Already turned in" : "Submit" }</button>
            { :else }
                <button disabled={ hasEmpty || quizPublishedUI } on:click={ () => publishSubmitAction() }>{ (quizPublishedUI) ? "Already published quiz" : "Publish Quiz" }</button>
            {/if }
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
            width: 100%;
            max-width: 540px;


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

                div.cover {
                    width: 12rem;
                    height: 16rem;

                    border-radius: 1rem;
                    border: 1px dashed app.$color-midground;

                    display: flex;
                    align-items: center;
                    justify-content: flex-start;

                    &.fill {
                        border: none;
                        justify-content: center;
                    }
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

                
            }
        }

        section#quiz {
            width: 100vw;

            div.submit {
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 1rem 0px 8rem 0px;
            }

            button.add {
                margin: 0px auto;
                width: 100%;
                max-width: 500px;
            }

            
            div.error {
                margin: 0rem auto 2rem auto;
                max-width: 840px;
                display: flex;
                justify-content: center;
                transform: translateY(-1.5rem);

                p { color: app.$color-error }
            }
        }
    }

    


</style>

