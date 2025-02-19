

<script lang="ts">
    import { goto } from "$app/navigation";
    import { auth, database } from "$lib/firebase/app";
    import Icon from "$lib/interface/Icon.svelte";
    import SocialAuth from "$lib/interface/SocialAuth.svelte";
    import Tabbar from "$lib/interface/Tabbar.svelte";
    import Textfield from "$lib/interface/Textfield.svelte";
    import { createUserWithEmailAndPassword, signInWithPopup, updateProfile, type User } from "firebase/auth";
    import { doc, getDoc, setDoc } from "firebase/firestore"; 
    import { GoogleAuthProvider } from "firebase/auth";
    import { sendNotification } from "$lib/utilities/notifications";
    import { browser } from "$app/environment";

    let role: string = "";
    let roleError = "";

    let institutionName: string = "";
    let institutionNameError = "";

    let institutionUsername: string = "";
    let institutionUsernameError = "";

    let name: string = "";
    let nameError : string = "";
    
    let email: string = "";
    let emailError : string = "";

    let password: string = "";
    let showPassword = false;
    let passwordError : string = "";

    $: socialFormValid = 
        (role === "admin" ?
            (
                (institutionName !== "") && (institutionNameError === "") &&
                (institutionUsername !== "") && (institutionUsernameError === "")
            ) : true) &&
            (role !== "") && (roleError === "");


    $: formValid = 
        (socialFormValid) &&
        (name !== "") && (nameError === "") &&
        (email !== "") && (emailError === "") &&
        (password !== "") && (passwordError === "")
        ;


    const onRoleChange = () => {
        if (roleError.length > 0) { roleError = ""; }
    }

    const onInstitutionUsernameChanged = async () => {

        const regexPattern = /^[a-z\-]+$/
        if (regexPattern.test(institutionUsername) === false) {
            institutionUsernameError = "Usernames must be lowercase, and can only contain hyphens";
            return;
        };

        const snap = await getDoc(doc(database, "institution", institutionUsername.toLocaleLowerCase()));
        if (!snap.exists()) { return; }

        institutionUsernameError = "A school with that username is already registered";
    }


    const seedAuthenticationDatabase = async (auth: User, school?: { username: string, name: string }) => {
        if (school) {
            await setDoc(doc(database, "institution", school.username.toLocaleLowerCase()), {
                name: school.name,
                admin: auth.email,
                courses: [],
                students: 0,
                instructors: 0,
                lessons: 0,
                popularCourses: [],
                joinRequests: [],
                icon: ""
            });
        }  

        await setDoc(doc(database, "users", auth.uid), {
            courses: [], 
            notifications: [],
            request: null,
            role: role,
            institution: (school) ? school.username : null
        });

        
    }

    const submitForm = async () => {
            try {

            sendNotification({ type: "info", message: "Creating your account..." });
            const [firstName, surname] = name.split(" ");

            const userSnapshot = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userSnapshot.user, { displayName: `${ firstName } ${ surname ? surname : "" }` });

            await seedAuthenticationDatabase(userSnapshot.user, (role === "admin") ? { username: institutionUsername, name: institutionName } : undefined);
            sendNotification({ type: "success", message: "Account created successfully" });

            
            if (browser) {
                window.location.assign(window.location.origin);
            }

            goto("/");

        } catch (error: any) {
            console.error({ ...error });
        }
    }

    const socialRegister = async (type: "google") => {

        const google = new GoogleAuthProvider();

        try {
            const googleUserCredential = await signInWithPopup(auth, google);
            const { user } = googleUserCredential;
            if (!user) {
                throw new Error("Problem setting hooking up to the Google Flow");
            }
            await seedAuthenticationDatabase(user, (role === "admin") ? { username: institutionUsername, name: institutionName } : undefined);

            if (browser) {
                window.location.assign(window.location.origin);
            }

            goto("/");

        } catch (error: any) {

            if (error.code == "auth/popup-closed-by-user") {
                sendNotification({ type: "warning", message: "Sign in with google by choosing an account" })
            }

            console.error({ ...error })
        }
    }


    setTimeout(() => {
        if (role) { return } 
        roleError = "Choose one of these options please"
    }, 7000)


</script>


<form id="signup">

    <h1 style="align-self:flex-start">Register</h1>
    <p style="align-self: flex-start; margin-top:12px; color:grey; margin-bottom:1rem;">Ready to learn? Start by selecting the account options below.</p>
    
    <Tabbar onTabbarChange={ onRoleChange } error={ roleError } fill options={["student", "teacher", "admin"]} bind:bindingGroup={ role }/>
    <br>

    { #if role === "admin"}
        <h5 style="font-weight: 500;">Administration</h5>

        <Textfield
        type="name"
        bind:error={ institutionNameError }
        bind:value={ institutionName } 
        title="Institution Name"
        placeholder="e.g. California Institute of Technology"
        required={ true }
        requiredError="What school/institution are you a part of"
        ></Textfield>

        <br>

        <Textfield
        type="name"
        bind:error={ institutionUsernameError }
        bind:value={ institutionUsername } 
        title="Institution Username"
        placeholder="e.g. caltech"
        required={ true }
        requiredError="Enter a valid & unique username for your institution"
        onEdit={ onInstitutionUsernameChanged }
        ></Textfield>


        <br>
        <br>
    {/if }

    <h5 style="font-weight: 500;">Personal Account</h5>
    <Textfield
        type="name"
        bind:error={ nameError }
        bind:value={ name } 
        title="Full Name"
        placeholder="Ada Lovelace"
        required={ true }
        requiredError="Enter your full name, separated by a space"
    ></Textfield>

    <br>

    <Textfield
        type="email"
        bind:error={ emailError }
        bind:value={ email } 
        title="Email Address"
        placeholder="name@institution.org"
        required={ true }
        requiredError="Enter your official email address"
    ></Textfield>

    <br>

    <Textfield
        title="Create Password"
        bind:error={ passwordError }
        bind:value={ password }
        placeholder="Enter password"
        type={ showPassword ? "text" : "password" }
        required={ true }
        requiredError="Enter a password you will use to sign in"
    >   
    <Icon slot="action" handleClick={ () => { showPassword = !showPassword } }>
        { #if showPassword }
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17.8198 5.76998C16.0698 4.44998 14.0698 3.72998 11.9998 3.72998C8.46984 3.72998 5.17984 5.80998 2.88984 9.40998C1.98984 10.82 1.98984 13.19 2.88984 14.6C3.67984 15.84 4.59984 16.91 5.59984 17.77" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.41992 19.5302C9.55992 20.0102 10.7699 20.2702 11.9999 20.2702C15.5299 20.2702 18.8199 18.1902 21.1099 14.5902C22.0099 13.1802 22.0099 10.8102 21.1099 9.40018C20.7799 8.88018 20.4199 8.39018 20.0499 7.93018" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15.5104 12.7002C15.2504 14.1102 14.1004 15.2602 12.6904 15.5202" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.47 14.5298L2 21.9998" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22.0003 2L14.5303 9.47" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        { :else }
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5799 11.9999C15.5799 13.9799 13.9799 15.5799 11.9999 15.5799C10.0199 15.5799 8.41992 13.9799 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C13.9799 8.41992 15.5799 10.0199 15.5799 11.9999Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.9998 20.2702C15.5298 20.2702 18.8198 18.1902 21.1098 14.5902C22.0098 13.1802 22.0098 10.8102 21.1098 9.40021C18.8198 5.80021 15.5298 3.72021 11.9998 3.72021C8.46984 3.72021 5.17984 5.80021 2.88984 9.40021C1.98984 10.8102 1.98984 13.1802 2.88984 14.5902C5.17984 18.1902 8.46984 20.2702 11.9998 20.2702Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>                    
        {/if }
    </Icon>
    </Textfield>
    
    <br>

    <button disabled={ !formValid } on:click={ submitForm } id="cta">Register</button>

    <div id="other">
        <span class="border"> </span>
        <span id="text">Or register with</span>
        <span class="border"></span>

    </div>

    <SocialAuth disabled={ !socialFormValid } socialIcon="/icons/google.webp" text="Continue with Google" onClickAction={ () => socialRegister("google") } />
    <!-- <SocialAuth socialIcon={ "/icons/apple.svg" } text={ "Continue with Apple" } /> -->

    <p style="font-size: 14px; margin:1rem auto 0px auto; text-align: center">Already have an Account?<a href="/auth/login" style="cursor: pointer; color: rgb(26,115,232); margin-left: 5px">Sign in</a></p>
</form>


<style lang="scss">
    @use "$lib/interface/variables" as app;
</style>

