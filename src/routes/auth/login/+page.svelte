<script lang="ts">
    import SocialAuth from "$lib/interface/SocialAuth.svelte";
    import Textfield from "$lib/interface/Textfield.svelte";
    import Icon from "$lib/interface/Icon.svelte";
    import { goto } from "$app/navigation";
    import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
    import { auth, database } from "$lib/firebase/app";
    import { sendNotification } from "$lib/utilities/notifications";
    import { getDoc, doc } from "firebase/firestore";

    let email: string = "";
    let password: string = "";
    let showPassword = false;

    let emailError : string = "";
    let passwordError : string = "";

    $: formValid = 
        (email !== "") && (emailError === "") &&
        (password !== "") && (passwordError === "");

    const onEmailChanged = async () => {

        const snap = await getDoc(doc(database, "users", email.toLocaleLowerCase()));
        if (snap.exists()) { return; }

        emailError = "No account exists with that email";
    }

    const submitLoginForm = async () => {
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
            sendNotification({ type: "success", message: "Signed in successfully" })
            goto("/profile");   

        } catch (error: any) {

            const { code } = error as { code: string };

            switch (code) {
                case "auth/invalid-credential":
                    sendNotification({ type: "error", message: "No account exists under that email & password combination" })
                    break;  
            
                default:
                    break;
            }

            console.error({ ...error })
        }
    }

    const socialSignIn = async (type: "google") => {
        const google = new GoogleAuthProvider();

        try {
            const googleUserCredential = await signInWithPopup(auth, google);
            const { user } = googleUserCredential;
            if (!user) {
                throw new Error("Problem setting hooking up to the Google Flow");
            }


            goto("/");

        } catch (error: any) {

            if (error.code == "auth/popup-closed-by-user") {
                sendNotification({ type: "warning", message: "Sign in with google by choosing an account" })
            }

            console.error({ ...error })
        }
    }
</script>


    <div id="login">
    <h1 style="align-self:flex-start"> Sign in  </h1>
    <p style="align-self: flex-start; margin-top:12px; color:grey; margin-bottom:1rem;">Ready to learn? Welcome back to LearnX.</p>

    <Textfield
    type="email"
    bind:error={ emailError }
    bind:value={ email } 
    title="Email Address"
    placeholder="name@institution.org"
    onEdit={ onEmailChanged }
   ></Textfield>

    <br>
   
    <Textfield
    title="Password"
    actionTitle={ undefined }
    onActionClicked={ () => { goto("/auth/forgot") }}
    bind:error={ passwordError }
    bind:value={ password }
    placeholder="Enter password"
    type={ showPassword ? "text" : "password" }
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



    <button disabled={ !formValid } on:click={ submitLoginForm } id="cta">Login</button>

        <div id="other">
            <span class="border"> </span>
            <span id="text">Or sign in with</span>
            <span class="border"></span>
        </div>

        <SocialAuth socialIcon="/icons/google.webp" text="Continue with Google" onClickAction={ () => socialSignIn("google") } />

        <p style="font-size: 14px; margin-top:1rem">Don't have an account? <a style="color: rgb(26,115,232); cursor: pointer;" href="/auth/register">Sign up</a></p>

        <style lang="scss">

        </style>
    </div>

<style lang="scss">
    
</style>


