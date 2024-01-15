

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
    import { user } from "$lib/functions/authentication";
    import { text } from "@sveltejs/kit";
    import { sendNotification } from "$lib/utilities/notifications";
    import { DateTime } from "luxon";
    import { onMount } from "svelte";

    interface LessonPageData extends lessonData {
        test: StudentTest
    }

    export let data: LessonPageData;
    const { title, postDate, quiz, courseID, id, ideas, instructor, quizPublished, cover, test } = data;
    const { lessonID } = $page.params;
    console.log(data);

    const dt = DateTime.fromJSDate(postDate).toLocaleString(DateTime.DATE_HUGE);

    let ideasUI: LessonIdea[] = ideas;
    let titleUI: string = title;
    let quizUI: QuizQuestion[] = ((quizPublished === false && $user.role === "student") || !test) ? [] : quiz;
    let testUI: StudentTest | undefined = test;
    let quizPublishedUI : boolean = quizPublished;

    let stageView: string = "lesson";

    $: turnable = 
        (testUI !== undefined) &&
        (testUI.answers.length > 0) &&
        (testUI.submitted == false) &&
        (testUI.answers.includes(-1) == false);
        

    $: isEmpty = quizUI.length === 0;

    $: hasEmpty = 
        [...quizUI.map((q) => q.prompt), ...quizUI.flatMap((q) => q.choices)]
        .includes("");

    $: grade = 
        (testUI && testUI.answers.length > 0) ?
        ((testUI.answers.map((answer, index) => (answer === quizUI[index].correct) ? 1 : 0) as number[])
        .reduce((acc, current) => acc + current) / testUI.answers.length)
        : 0;


    const getAnswers = async () => {

        const submission = await getDoc(doc(database, "lesson", lessonID, "submissions", $user.id));
        if (!user || !submission.exists()) { return }

        const { answers, submitted: turnedIn } = submission.data()!;
        let answerValues = (quiz.map((_, index) => answers[index] ? answers[index] : -1 ))
        let assessment = {
            submitted: turnedIn,
            answers: answerValues
        }
        
        testUI = assessment
    }

    onMount(() => {

        if ($user.role === "student") {
        getAnswers();
        }
    })

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

        if ($user.role === "student" && testUI) {
            const updatedAnswers = [...testUI.answers.slice(0, index), userAnswer , ...testUI.answers.slice(index + 1)];
            await updateDoc(doc(database, "lesson", lessonID, "submissions", $user.id), {
                answers: updatedAnswers
            });

            testUI = {
                ...testUI,
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

            if (!testUI) { throw Error("No test ui") }


                        
            // const notifyTeacher = updateDoc(doc(database, "users", instructor.id), {
            //     notifications: arrayUnion({ read: false, text: `${ $user.firstName } ${ $user.lastName } (${ $user.email }) has submitted the quiz on ${ titleUI }`, title: "New submission" })
            // });

            console.log(instructor.id);

            const submit = updateDoc(doc(database, "lesson", lessonID, "submissions", $user.id), {
                submitted: true
            });

            await Promise.all([submit]);
            sendNotification({ type: "success", message: "Successfully turned in assignment" }, 4000);

            testUI = {
                ...testUI,
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
        <img class="background" src={ cover === "" ? "/images/empty/book.png" : cover } alt="">

        <section class="info">
            <div class="cover fill">
                <img src={ cover === "" ? "/images/empty/book.png" : cover } alt="">
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
                    <Icon frame={[1.5,1.5]}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7499 2.44995C11.4499 1.85995 12.5799 1.85995 13.2599 2.44995L14.8399 3.79995C15.1399 4.04995 15.7099 4.25995 16.1099 4.25995H17.8099C18.8699 4.25995 19.7399 5.12995 19.7399 6.18995V7.88995C19.7399 8.28995 19.9499 8.84995 20.1999 9.14995L21.5499 10.7299C22.1399 11.4299 22.1399 12.5599 21.5499 13.2399L20.1999 14.8199C19.9499 15.1199 19.7399 15.6799 19.7399 16.0799V17.7799C19.7399 18.8399 18.8699 19.7099 17.8099 19.7099H16.1099C15.7099 19.7099 15.1499 19.9199 14.8499 20.1699L13.2699 21.5199C12.5699 22.1099 11.4399 22.1099 10.7599 21.5199L9.17988 20.1699C8.87988 19.9199 8.30988 19.7099 7.91988 19.7099H6.16988C5.10988 19.7099 4.23988 18.8399 4.23988 17.7799V16.0699C4.23988 15.6799 4.03988 15.1099 3.78988 14.8199L2.43988 13.2299C1.85988 12.5399 1.85988 11.4199 2.43988 10.7299L3.78988 9.13995C4.03988 8.83995 4.23988 8.27995 4.23988 7.88995V6.19995C4.23988 5.13995 5.10988 4.26995 6.16988 4.26995H7.89988C8.29988 4.26995 8.85988 4.05995 9.15988 3.80995L10.7499 2.44995Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8.5 15.9401L12 8.06006L15.5 15.9401" stroke="#292D32" stroke-width="1.5" stroke-linejoin="bevel"/>
                            <path d="M13.75 13.3101H10.25" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                                          
                    </Icon>
        
                    <p>Grade: { testUI?.submitted ? `${ (grade * 100).toFixed(0) }%` : "Not submitted" }</p>
                </div>
        
                <div class="chip">
                    <Icon frame={[1.5,1.5]}>
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
            
            
            { #each quizUI as question, index }
            <Question test={ testUI } updateQuestion={ questionUpdate } question={ question } index={ index } />
            {/each }

            { #if hasEmpty && $user.role !== "student" }
            <div class="error">
                <p style="text-align: center">You must add text to all answer choices and prompts to publish quiz to students</p>
            </div>
            {/if }
            

            { #if $user.role !== "student" && $user.id === instructor.id && quizPublishedUI === false }
            <button class="add" on:click={ addQuestion }>
                <div class="icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.3033 16.9099L16.9099 6.30327M6.3033 6.30327L16.9099 16.9099" stroke="#363853" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </div>

                <h5>Add Question</h5>
            </button>
            {/if }

            { #if (!quizPublishedUI || !testUI) && $user.role === "student" }
            <div class="empty">
                <div class="thumbnail"><img src="/images/empty/test.png" alt=""></div>
                <h3>There is no published quiz for this lesson</h3>
                <p>You can still learn the material anyway, and wait for the instructor to add a quiz</p>
            </div> 
            { /if }



            <div class="submit">
            { #if $user.role === "student" }
                <button style={ `display: ${ quizPublishedUI ? "inline" : "none" }` } disabled={ !turnable } on:click={ () => quizSubmitAction() }>{ (testUI?.submitted) ? "Already turned in" : "Submit" }</button>
            { :else }
                <button disabled={ hasEmpty || quizPublishedUI || isEmpty } on:click={ () => publishSubmitAction() }>{ (quizPublishedUI) ? "Already published quiz" : "Publish Quiz" }</button>
            {/if }
            </div>
        
        </section>

    </article>
</main>



<style lang="scss">
    @use "$lib/interface/variables" as app;

    main {

        gap: 0px;

        div.chip {
            fill: transparent;
            stroke: app.$color-foreground;

            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.5rem;

            @media screen and (max-width: 640px) {
                flex-direction: column;
                align-items: flex-start;
            }
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
                    margin-bottom: 1rem;
                    margin-top: 2rem;

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
            padding: 2rem 5vw 0px 5vw;

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

                padding: 1rem 0px 6rem 1.5rem;

                :global(button.add.lesson) {
                    margin-top: 1rem;
                }



                @media screen and (max-width: 640px) {
                    :global(button.add.lesson) {
                        transform: translateX(-0.75rem);
                    }
                }
                
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

