

<script lang="ts">
    import Lessoncard from "$lib/cards/lessoncard.svelte";
    import Usercard from "$lib/cards/usercard.svelte";
    import { database, uploadCourseCoverImage } from "$lib/firebase/app";
    import Editable from "$lib/interface/Editable.svelte";
    import Icon from "$lib/interface/Icon.svelte";
    import type { CourseData, lessonData } from "$lib/models/app";
    import { user } from "$lib/functions/authentication";
    import { sendNotification } from "$lib/utilities/notifications";
    import { Timestamp, addDoc, arrayRemove, arrayUnion, collection, doc, increment, setDoc, updateDoc } from "firebase/firestore";

    export let data: CourseData;
    const { courseID, tag, title, objective, lessons, instructor, students, cover } = data;
    const courseReference = doc(database, "course", courseID);

    let lessonsUI : lessonData[] = lessons;
    let studentsUI = students; 


    let tagUI: string = tag;
    let titleUI: string = title;
    let objectiveUI: string = objective;
    let coverUI = cover; 

    $: enrolled = studentsUI.findIndex((i) => i.id === $user.id) !== -1;


    $: hasEditAccess = $user.role !== "student" && (instructor.id === $user.id || $user.role === "admin")

    const onFilePicked = async (event: Event) => {

        try {
            if (!event.target) { return; }

            const filePicker = event.target as HTMLInputElement;
            const file = filePicker.files![0];

            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = () => {
                    coverUI = reader.result as string;
                }

                sendNotification({ type: "success", message: "Uploading file. Please don't close browser" }, 5000);
                await uploadCourseCoverImage(file, $user.institution!.id, courseID);

                sendNotification({ type: "success", message: "Cover image uploaded" }, 5000);

            } else {
                sendNotification({ type: "error", message: "Only image files are allowed" }, 5000);
            }

        } catch (error) {
            console.error(error);
            return;
        }
        
    }

    const onDropHandle = async (event: DragEvent)  => {
        event.preventDefault();
        event.stopPropagation();

        if (!hasEditAccess) { return; }


        const files = event.dataTransfer!.files;
        const file = files[0];

        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                coverUI = reader.result as string;
            }

            sendNotification({ type: "info", message: "Uploading cover image" }, 5000);
            await uploadCourseCoverImage(file, $user.institution!.id, courseID);

            sendNotification({ type: "success", message: "Cover image uploaded" }, 5000);

        } else {
            sendNotification({ type: "error", message: "Only image files are allowed" }, 5000);
        }
    }

    const onOpenFilePicker = (event: MouseEvent) => {
        if (!hasEditAccess) { return; }

        event.preventDefault();
        event.stopPropagation();

        const filePicker = document.getElementById("filePicker") as HTMLInputElement;
        filePicker.click();
    }


    async function onTitleEdit() {
        await updateDoc(courseReference, { title: titleUI });
    }

    async function onTagEdit() {
        await updateDoc(courseReference, { tag: tagUI });
    }

    async function onObjectiveEdit() {
        await updateDoc(courseReference, { objective: objectiveUI });
    }


    async function manageRegistration(action: "enroll" | "dropout") {
        const userID = $user.id; 

        const studentProfile = { name: `${ $user.firstName } ${ $user.lastName }`, email: $user.email!, pfp: $user.photoURL, id: $user.id };

        try {
            const register = updateDoc(doc(database, "course", courseID), {
                students: (action === "enroll") ? arrayUnion(studentProfile) : arrayRemove(studentProfile)
            });

            const schedule = updateDoc(doc(database, "users", userID), {
                courses: (action === "enroll") ? arrayUnion(courseID) : arrayRemove(courseID)
            });

            // lessonsUI.map((ls) => setDoc(doc(database, "lesson", ls.id, "submissions", $user.email));

            const updates = lessonsUI.map((ls) => setDoc(doc(database, "lesson", ls.id, "submissions", userID), {
                answers: [], 
                submitted: false
            }));

            await Promise.all([register, schedule, ...updates]);

            studentsUI = (action === "enroll") ? [...studentsUI, studentProfile] : [...studentsUI].filter((i) => i.email !== userID);
            sendNotification({ type: "success", message: `Successfully ${ (action === "enroll") ? "enrolled in course" : "dropped out of course"  }` }, 3000)

        } catch (error) {
            console.error(error);
        }
    }


    async function addLesson() {

        const newLesson = {
            courseID: courseID,
            cover: coverUI,
            title: "",
            subtitle: "",
            ideas: [],
            quiz: [],
            quizPublished: false, 
            postDate: new Date(),
            instructor: {
                id: $user.id,
                name: `${ $user.firstName } ${ $user.lastName }`,
                email: $user.email,
                pfp: $user.photoURL
            }
        }

        const lessonRef = await addDoc(collection(database, "lesson"), newLesson);

        await updateDoc(courseReference, {
            lessons: arrayUnion(lessonRef.id)
        });

        await updateDoc(doc(database, "institution", $user.institution!.id), {
            lessons: increment(1)
        })

        lessonsUI = [...lessonsUI, { ...newLesson, id: lessonRef.id }];

    }

</script>

<main>

    <article id="showcase">

        <div>

            <span>
                &#35;
                <Editable
                type="h6"
                onFinishEdit={ onTagEdit }
                editable={ true }
                bind:value={ tagUI }
                placeholder="Course Type"
                />
            </span>
            

            <Editable
                type="h1"
                bind:value={ titleUI }
                editable={ true }
                placeholder="Course 101: Enter Short Descriptive Title Here..."
                onFinishEdit={ onTitleEdit }
            />

            <div class="instructor">
                <img style="border: 1px solid lightgray; border-radius: 2rem" src={ instructor.pfp ? instructor.pfp : "/icons/anonymous.png" }  alt="">
                <p>{ instructor.name }</p>
            </div>
        </div>


        <div>
            { #if coverUI }
            <img src={ coverUI }  alt="">
            { :else }
            <button on:click={ onOpenFilePicker } on:drop={ onDropHandle } on:dragover={ (event) => event.preventDefault() } class="add cover">
                <div class="icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.3033 16.9099L16.9099 6.30327M6.3033 6.30327L16.9099 16.9099" stroke="#363853" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </div>

                <h5>Add Cover</h5>
            </button>
            {/if }  

            <input id="filePicker" type="file" style="display: none;" on:change={ onFilePicked } accept="image/*"/>
        </div>


        <div>
            <div class="nuggets">
                <div>
                    <h6>Lessons</h6>
                    <p>{ lessonsUI.length }</p>
                </div>
                <div>
                    <h6>Difficulty</h6>
                    <p>Intermediate</p>
                </div>
            </div>


            <div class="info">
                <div class="chip">
                    <Icon frame={[1.3,1.3]}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.1197 12.78C12.0497 12.77 11.9597 12.77 11.8797 12.78C10.1197 12.72 8.71973 11.28 8.71973 9.50998C8.71973 7.69998 10.1797 6.22998 11.9997 6.22998C13.8097 6.22998 15.2797 7.69998 15.2797 9.50998C15.2697 11.28 13.8797 12.72 12.1197 12.78Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>                    
                    </Icon>
    
                    <p>{ studentsUI.length } students</p>
                </div>


                <div class="chip">
                    <Icon frame={[1.3,1.3]}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.75 13.25C20.75 18.08 16.83 22 12 22C7.17 22 3.25 18.08 3.25 13.25C3.25 8.42 7.17 4.5 12 4.5C16.83 4.5 20.75 8.42 20.75 13.25Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 8V13" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 2H15" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>                                             
                    </Icon>
    
                    <p>{ (lessons.length * 0.5).toFixed(1) } hrs</p>
                </div>

                { #if $user.role === "student" }
                <button class={ enrolled ? "tertiary" : "secondary" } on:click={ () => manageRegistration((enrolled) ? "dropout" : "enroll") } style="margin-top: 1rem;">{ enrolled ? "Drop Out" : "Enroll in Course" }</button>
                {/if }
            </div>

        </div>



        <h1 id="tag">Chemistry</h1>

    </article>



    <article id="objective">
        <h3>Objective</h3>

        <Editable
            editable={ hasEditAccess }
            placeholder="Enter course objective here ..." 
            onFinishEdit={ onObjectiveEdit } 
            bind:value={ objectiveUI }/>
    </article>

    <article id="students">
        <h3>Students</h3>

        <div class="grid">
            { #each studentsUI as student }
                <Usercard user={ student } />
            {/each }
        </div>

        { #if studentsUI.length === 0 }
            <div class="empty">
                <img src="/images/community.png" alt="">
                <h4>No students enrolled</h4>
            </div>
        {/if }
    </article>


    <article id="lessons">
        <h3>Lessons</h3>

        <div class="grid">
            {#each lessonsUI as item, index }
                <Lessoncard disabled={ (enrolled === false) && $user.role === 'student' } lesson={ item } index={ index }/>
            {/each }

            { #if $user.role !== "student" && (instructor.id === $user.id || $user.role === "admin") }
            <button  on:click={ addLesson } class="add lesson">
                <div class="icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.3033 16.9099L16.9099 6.30327M6.3033 6.30327L16.9099 16.9099" stroke="#363853" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </div>

                <h5>Add Lesson</h5>
            </button>
            {/if }
        </div>

        { #if !enrolled && $user.role === "student" }
            <p style="color: #DF3F5A; opacity: 80%; margin: 1rem auto 0px auto;">You must be enrolled in this course to view its lessons</p>
        { /if }
    </article>

</main>


<style lang="scss">

    @use "$lib/interface/variables" as app;

    main {

        padding-bottom: 5rem;

        button.add {
            border: 1px dashed app.$color-shade;
            border-radius: 1rem;
            background-color: transparent;

            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
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

            &.cover {
                width: 14rem;
                height: 19rem;
            }

            &.lesson {
                width: 100%;
                height: 100%;

                min-height: 9rem;

            }
        }


        > * {
            width: 100%;
            max-width: app.$max-width;
            margin: 0px auto;
            padding: 0px 5vw;

        }


        article#showcase {


            position: relative;

            // border: 1px solid orange;
            margin-top: 3rem;
            padding-top: 4rem;
            padding-bottom: 2rem;

            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 52vh;
            gap: 1rem 5vw;

            > div {
                // border: 1px solid blue;
                flex-grow: 1;
            }

            

            // Information section
            > div:nth-child(1) {
                display: flex;
                justify-content: center;
                flex-direction: column;
                gap: 1.5rem;

                div.instructor {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 0.5rem;
                    max-height: 2rem;

                    img { width: 2rem; height: 2rem; border-radius: 1rem; }
                }

                :global(h1) { font-family: app.$typeface-heading; font-weight: app.$weight-bold; }

                :global(span) { display: flex; justify-content: flex-start; }

                :global(h6), :global(span) {
                    position: relative;
                    text-transform: uppercase;
                    width: max-content;

                    color: #FF662B;


                    &::after {
                        display: none;

                        position: absolute;
                        top: 0px;
                        bottom: 0px;
                        right: -10%;
                        z-index: -1;

                        content: "";
                        height: 100%;
                        width: 50vw;
                        background-color: #FFD3C2;
                    }

                }
            }

            // Graphic section
            > div:nth-child(2) {
                display: flex;
                align-items: center;
                justify-content: center;

                padding: 1rem 0px;

                img {
                    position: relative;
                    aspect-ratio: 238/324;
                    object-fit: fill;
                    border-radius: 1rem;
                }
            }

            // Graphic section
            > div {

                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 2rem;

                div.nuggets {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-template-rows: max-content;


                    border: 1px solid app.$color-shade;
                    border-radius: 0.8rem;

                    width: 100%;
                    height: 3.5rem;
                    

                    > div {
                        display: flex;
                        flex-direction: column;
                        gap: 0px;

                        padding: 0.5rem 1rem;
                        
                        &:nth-child(1) { border-right: 1px solid app.$color-shade; }

                        h6 { text-transform: uppercase; color: app.$color-midground; font-size: 70%; line-height: 120%; }
                    }
                }

                div.info {
                    margin-left: 0.5rem;

                    display: flex;
                    flex-direction: column;
                    gap: 0.3rem;

                    svg { stroke: app.$color-midground; }

                    
                }
                
            }



            > h1#tag {
                display: none;

                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
                font-size: 12vw;
                font-family: app.$typeface-heading;
                font-weight: 700;
                color: app.$color-elevate;
                z-index: -5;

                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: app.$color-shade;
            }

            @media (max-width: 640px) {
                grid-template-columns: 1fr;
                grid-template-rows: max-content max-content max-content;
                gap: 1rem 0px;

                > div {
                    flex-grow: 1;
                }

                > div:nth-child(1) {
                    gap: 0.8rem;
                    margin-top: 1.5rem;
                    margin-bottom: 1rem;
                }

                > div:nth-child(2) {
                    grid-row: 1 / 2;
                }

                // > div:nth-child(3) {
                //     grid-row: 3 / 4;
                //     grid-column: 1 / 2;
                // }
            }


        }

        article#objective {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            gap: 1rem;

            margin-top: 1rem;
            margin-bottom: 3rem;
        }

        article#students {
            div.grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                margin-top: 1rem;
                gap: 1rem 1rem;
            }

            div.empty {

                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 3rem 0px;

                gap: 1rem;

                img { height: 12rem; }
                h4 { color: app.$color-midground; }
            }
        }

        article#lessons {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            div.grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                grid-auto-rows: 1fr;
                gap: 1rem;


                // padding: 0px 5vw;
            }

            
        }

        
    }
</style>


