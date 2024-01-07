


<script lang="ts">
    import { goto } from "$app/navigation";
    import Coursecard from "$lib/cards/coursecard.svelte";
    import { database } from "$lib/firebase/app";
    import Textfield from "$lib/interface/Textfield.svelte";
    import { user } from "$lib/utilities/authentication";
    import { getDoc, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";


    let coursesUI = $user.courses;

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
            await setDoc(doc(database, "course", courseID), {
                tag: "",
                cover: "",
                objective: "",
                title: courseName,
                lessons: [],
                campus: $user.institution?.id,

                instructor: {
                    name: `${ $user.firstName } ${ $user.lastName }`,
                    pfp: $user.photoURL
                }
            });

            await updateDoc(doc(database, "users", $user.email!), {
                courses: arrayUnion(courseID)
            });

            coursesUI.push(courseID);

            goto(`/course/${ courseID }`);

        } catch (error) {
            console.error(error);
        }
    }

    console.log($user);

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
        <h3>{ $user.role === "student" ? "Courses you are enrolled in" : ($user.role === "teacher" ? "Courses you are teaching" : "Courses offered at your school") }</h3>
        { #if coursesUI.length === 0 }
        <div class="empty">
            <div class="thumbnail"><img src="/images/empty/class.png" alt=""></div>

            
            {#if $user.role === "admin" }
            <h4>Your institution does not offer any courses</h4>
            <p>Create a new course to teach above for students to enroll in</p>
            {:else if $user.role === "teacher" }
            <h4>You are not teaching any courses</h4>
            <p>Create a new course to teach above for students to enroll in</p>
            {:else}
            <h4>You are not enrolled in any courses</h4>
            <p>Check out the available course listings below</p>
            {/if}
        </div>
        { :else }
            <div class="grid">
                { #each coursesUI as course }
                    <Coursecard course={ course } />
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
        margin: 0px 8vw;
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

    section#courses {
        div.empty a { color: app.$color-brand; }

        div.grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1rem 1rem;
        }
    }
</style>

