


<script lang="ts">
    import { goto } from "$app/navigation";
    import Coursecard from "$lib/cards/coursecard.svelte";
    import { database } from "$lib/firebase/app";
    import Textfield from "$lib/interface/Textfield.svelte";
    import type { CourseData } from "$lib/models/app.js";
    import { user } from "$lib/functions/authentication.js";
    import { sendNotification } from "$lib/utilities/notifications.js";
    import { getDoc, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";


    export let data;
    const { courses } = data as { courses: CourseData[] };
    let personalCourses = $user.courses.map((id) => courses.find((each) => each.courseID === id));

    let institutionalCourses = courses;

    let courseName: string = "";
    let courseNameError: string = "";

    let courseID: string = "";
    let courseIDError: string = "";

    $: institutionID = $user.institution? $user.institution!.id : "";

    $: formValid = 
        ($user.role !== "student" ?
            (
                (courseName !== "") && (courseNameError === "") &&
                (courseID !== "") && (courseIDError === "")
            ) : true) &&

        true;

    const onCourseIDChanged = async () => {

        const regexPattern = /^[a-z\-]+$/
        if (regexPattern.test(courseID) === false) {
            courseIDError = "IDs must be lowercase, and can only contain hyphens";
            return;
        };

        const snap = await getDoc(doc(database, "course", courseID));
        if (!snap.exists()) { return; }

        courseIDError = "A course is already registered under that ID";
    }


    const createCourse = async () => {
        try {

            sendNotification({ type: "info", message: "Creating new course ..." }, 4000);

            const newCourse = {
                tag: "",
                cover: "",
                objective: "",
                title: courseName,
                lessons: [],
                students: [],
                campus: $user.institution?.id,

                instructor: {
                    name: `${ $user.firstName } ${ $user.lastName }`,
                    email: $user.email,
                    pfp: $user.photoURL
                }
            }

            await setDoc(doc(database, "course", courseID), newCourse);
            await updateDoc(doc(database, "users", $user.email!), {
                courses: arrayUnion(courseID)
            });

            personalCourses.push({
                courseID: courseID,
                ... newCourse
            });

            institutionalCourses.push({
                courseID: courseID,
                ... newCourse
            });

            sendNotification({ type: "success", message: "Course created" }, 4000);
            goto(`/course/${ courseID }`);

        } catch (error) {
            console.error(error);
        }
    }

</script>

<main>
    { #if $user.role !== "student" }
        <form id="create">
            <h3>Create a new course</h3>

            <div class="grid">
                <Textfield
                type="text"
                title="Course Name"
                bind:error={ courseNameError }
                bind:value={ courseName } 
                placeholder="Chemistry 101: Understanding the World Around Us"
                required={ true }
                requiredError="Enter a name for your new class"
                onEdit={ onCourseIDChanged }
                ></Textfield>

                <Textfield
                type="text"
                title="Course ID"
                bind:error={ courseIDError }
                bind:value={ courseID } 
                placeholder="e.g. chemistry"
                required={ true }
                requiredError="Enter an id to uniquely identify your course at your institution"
                onEdit={ onCourseIDChanged }
                ></Textfield>
            </div>

            <div class="cta">
                <button  disabled={ !formValid } on:click={ () => createCourse() }>Create Course</button>
            </div>
        </form>
    { /if }

    <section id="courses">
        <h3>{ $user.role === "student" ? "Courses you are enrolled in" : ($user.role === "teacher" ? "Courses you are teaching" : "Your Courses") }</h3>
        { #if personalCourses.length === 0 }
        <div class="empty">
            <div class="thumbnail"><img src="/images/empty/teach.png" alt=""></div>

            
            {#if $user.role === "student" }
                <h4>You are not enrolled in any courses</h4>
                <p>Check out the available course listings below</p>
            {:else}
                <h4>You are not teaching any courses</h4>
                <p>Create a new course to teach above for students to enroll in</p>
            {/if}
        </div>
        { :else }
            <div class="grid">
                { #each personalCourses as course }
                { #if course}
                    <Coursecard course={ course } /> 
                {/if }
                {/each }
            </div>
        {/if }
    </section> 

    <section id="institution">
        <h3>{ $user.role === "student" ? "Available courses to enroll in" : ($user.role === "teacher" ? "Other institutional courses" : `${ $user.institution?.name }'s Courses`) }</h3>
    
        { #if institutionalCourses.length === 0 }
        <div class="empty">
            <div class="thumbnail"><img src="/images/empty/chill.png" alt=""></div>

            {#if $user.role === "student" }
                <h4>{ $user.institution ? `${ $user.institution.name } does not offer any courses with tutorials currently` : "Join an institution to enroll in their courses" }</h4>

                { #if $user.institution }
                    <p>Wait for a teacher on your institution to create courses for you to join</p>
                { :else }
                    <p>Look for institutions to join <a href="/institution">here</a></p>
                {/if }
            {:else}
                <h4>Your institution does not offer any courses</h4>
                <p>Create a new course to teach above for students to enroll in</p>
            {/if}

        </div>
        { :else }
            <div class="grid">
                { #each institutionalCourses as course }
                { #if course}
                    <Coursecard course={ course } /> 
                {/if }
                {/each }
            </div>
        {/if }
        
    </section>

</main>


<style lang="scss">
    @use "$lib/interface/variables" as app;

    main {
        padding-top: 5rem;
        padding-bottom: 8rem;
        min-height: calc(100vh - 12rem);
    }

    main > * {
        margin: 2rem 8vw 0px 8vw;

    }

    form#create {

        div.grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0rem 1rem;

            @media screen and (max-width: 680px) {
                grid-template-columns: 1fr;
                grid-template-rows: 1fr 1fr;
            }
        }

        div.cta {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 1rem 0rem;
        }

    }

    section > div.grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem 1rem;
    }

    section#courses {
        div.empty a { color: app.$color-brand; }

    }
</style>

