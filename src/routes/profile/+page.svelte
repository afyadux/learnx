


<script lang="ts">
    import Textfield from "$lib/interface/Textfield.svelte";
    import Icon from "$lib/interface/Icon.svelte";
    import AuthSection from "$lib/sections/authSection.svelte";
    import Editable from "$lib/interface/Editable.svelte";
    import { updateUser, updateUserEmail, user, type UserProfile } from "$lib/utilities/authentication";
    import Usercard from "$lib/cards/usercard.svelte";
    import Layout from "../auth/+layout.svelte";
    import { arrayRemove, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
    import { auth, database } from "$lib/firebase/app";
    import { deleteUser, EmailAuthCredential, EmailAuthProvider, getAuth, reauthenticateWithCredential, sendEmailVerification, sendSignInLinkToEmail, updateCurrentUser, updateEmail, updatePassword, updateProfile, verifyBeforeUpdateEmail } from "firebase/auth";
    import { sendNotification } from "$lib/utilities/notifications";
    import { goto } from "$app/navigation";
   

    interface UserRequest {
        email: string, name: string, pfp: string 
    }

    let institutionalName: string = $user.institution?.name ? $user.institution.name : "No Institution Joined";
    let firstNameUI: string = $user ? $user.firstName : "";
    let lastNameUI: string = $user ? $user.lastName : "";

    let requestsUI : UserRequest[] = [];

    let email: string = $user.email;
    let emailError : string = "";
    let emailEditable: boolean = false;

    let password: string = "";
    let showPassword = false;
    let passwordError : string = "";

    let confirmationPassword: string = "";
    let showConfirmationPassword = false;
    let confirmationPasswordError : string = "";
    let confirmationPasswordEditable : boolean = false;

    let newPassword: string = "";
    let showNewPassword = false;
    let newPasswordError : string = "";

    $: updatePasswordError = 
        (confirmationPassword === "" || newPassword === "") ||
        (confirmationPasswordError !== "" || newPasswordError !== "");


    // Functions
    (async () => {

        if ($user.role !== "admin" || !$user.institution) { return; }
        const institutionID = $user.institution!.id!;

        const { joinRequests: requests } = (await getDoc(doc(database, "institution", institutionID))).data() as any; 
        requestsUI = requests;
    })();

    // Approves a user to join an institution
    const approveUser = async (person: UserRequest) => {
        console.log("approving: ", person); 

        try {

            const institutionID = $user.institution?.id;
            if (!institutionID || institutionID === "") { return; }

            await updateDoc(doc(database, "users", person.email), {
                institution: institutionID,
                request: null
            });

            await updateDoc(doc(database, "institution", institutionID), {
                joinRequests: arrayRemove(person)
            });


            requestsUI = requestsUI.filter((item) => item.email !== person.email);

        } catch (error) { console.log(error) }

    }

    const updateEmailAddress = async () => {
        if (emailError !== "") { email = $user.email; emailError = ""; emailEditable = false; }
        if (auth.currentUser == null) { return }

        try {
            // const response = await verifyBeforeUpdateEmail(auth.currentUser, email);
            // await sendSignInLinkToEmail(auth, email, { handleCodeInApp: false, url: "https://google.com" });

            // sendNotification({
            //     message: `We sent a confirmation email to : ${ email } `,
            //     type: "info"
            // }, 3000);

            // updateUserEmail(email);
            // console.log(response);

        } catch (error) { console.log(error); }
    }

    const updateUserPassword = async () => {
        if (auth.currentUser == null) { return }

        sendNotification({ type: "info", message: "Updating password ..." });

        const { current, update } = { current: confirmationPassword, update: newPassword };
        const credential = EmailAuthProvider.credential($user.email, current); 

        try {

            await reauthenticateWithCredential(auth.currentUser, credential);
            await updatePassword(auth.currentUser, newPassword);

            sendNotification({
                message: `Successfully updated your password :)`,
                type: "info"
            }, 5000);

            confirmationPassword = "";
            newPassword = "";

        } catch (error : any) {
            if (error.code == "auth/invalid-credential") {
                sendNotification({ type: "error", message: "Wrong password provided" }, 3000);
                newPassword = "";
            }
        }
    }

    const wipeUser = async () => {
        try {
            if (!auth.currentUser) { return; }

            sendNotification({ type: "warning", message: "Permanently deleting your account!!" });
            goto("/auth/register");

            await deleteDoc(doc(database, "users", $user.email));
            await deleteUser(auth.currentUser);

            sendNotification({ type: "info", message: "Account deleted" });

        } catch (error) {
            console.error(error); 
        }
    }

    const updateName = async () => {
        if (!auth.currentUser) { return; }

        try {
            const freshName = `${ (firstNameUI && firstNameUI !== "") ? firstNameUI : "" }^^${ (lastNameUI && lastNameUI !== "") ? lastNameUI : "" }`;
            await updateProfile(auth.currentUser, { displayName:  freshName });
            sendNotification({ type: "success", message: "Successfully updated name" });

        } catch (error) { console.error(error) }
        
    }
</script>


<main>
    <section id="type">
        <p>{ $user.role[0].toUpperCase() + $user.role.slice(1) }</p>
    </section>

    <section id="account">
        <div class="profile">

            <div class="icons">
                <div class=""><img src={  $user?.photoURL ? $user.photoURL : "/icons/edit-pfp.png"  } alt=""></div>

                <div>
                <Icon>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.27 12C2.48 11.05 2 9.83 2 8.5C2 5.48 4.47 3 7.5 3H12.5C15.52 3 18 5.48 18 8.5C18 11.52 15.53 14 12.5 14H10" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20.73 12C21.52 12.95 22 14.17 22 15.5C22 18.52 19.53 21 16.5 21H11.5C8.48 21 6 18.52 6 15.5C6 12.48 8.47 10 11.5 10H14" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>                        
                </Icon>
                </div>

                <div class=""><img src="/icons/institution.png" alt=""></div>

                <Editable
                bind:value={ institutionalName }
                type="h4"
                placeholder="Institution Name"
                editable={ $user.role === "admin" } 
                />
            </div>


            <div class="name">
                <Editable
                bind:value={ firstNameUI }
                type="h2"
                placeholder="First Name"
                editable={ true }
                onFinishEdit={ () => updateName() }
            />

                <Editable
                bind:value={ lastNameUI }
                type="h1"
                placeholder="Last Name"
                editable={ true }
                onFinishEdit={ () => updateName() }
            />

            </div>

        </div>

        <div class="progress">
        { #each Array(4) as _ }
            <div>
                <h4>Lessons</h4>
                <h2>12</h2>
            </div>
        {/each }
        </div>
    </section>

    { #if $user.email !== "" && $user.role === "admin" }
    <section id="requests">
        <h3>Join Requests</h3>

        { #if requestsUI.length === 0 }
            <div class="empty">
                <div class="thumbnail"><img src="/images/empty/community.png" alt=""></div>

            <div style="display: flex; flex-direction: column; align-items: center">
                <h3>You are all caught up</h3>
                <p>You have no new members requesting to join your institution</p>
            </div>
            </div>
        { :else }
            <div class="grid">
                { #each requestsUI as person }
                    <Usercard
                        user={ person }
                        approvals={ true }
                        onApprove={ () => approveUser(person) }
                        />
                {/each }
            </div>
        { /if }            

    </section>
    {/if }


    

    { #if $user.role !== "admin" && !$user.institution }
    <section id="join">
        <h3>Institution</h3>

        <div class="thumbnail"><img src="/images/empty/campus.png" alt=""></div>
        <h4>You have not joined any institution</h4>
        <p>Classes and lessons are only accessible to members of a certain institution</p>
        <a class="button secondary" href="/institution">Join and find classes & lessons</a>

    </section>
    {/if }


    <section id="user">
        

        <h3>Reset Password</h3>
        <div id="info">
            <Textfield
                editable={ confirmationPasswordEditable }
                title="Current Password"
                bind:error={ confirmationPasswordError }
                bind:value={ confirmationPassword }
                placeholder="Enter current correct password"
                type={ showConfirmationPassword ? "text" : "password" }
                required={ true }
                requiredError="Enter your correct sign in password"
            >   
            <slot slot="action">
                { #if confirmationPasswordEditable }
                    <slot>    
                        <Icon handleClick={ () => { confirmationPassword = ""; confirmationPasswordEditable = false; confirmationPasswordError = "" } }>
                            <svg width="24" style="stroke: #DF3F5A !important" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.3033 16.9099L16.9099 6.30327M6.3033 6.30327L16.9099 16.9099" stroke="#363853" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                        </Icon>
        
                        <Icon handleClick={ () => { showConfirmationPassword = !showConfirmationPassword } }>
                            { #if showConfirmationPassword }
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
                    </slot> 
                { :else }
                    <Icon handleClick={ () => confirmationPasswordEditable = true }>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.2603 3.59997L5.05034 12.29C4.74034 12.62 4.44034 13.27 4.38034 13.72L4.01034 16.96C3.88034 18.13 4.72034 18.93 5.88034 18.73L9.10034 18.18C9.55034 18.1 10.1803 17.77 10.4903 17.43L18.7003 8.73997C20.1203 7.23997 20.7603 5.52997 18.5503 3.43997C16.3503 1.36997 14.6803 2.09997 13.2603 3.59997Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11.8896 5.05005C12.3196 7.81005 14.5596 9.92005 17.3396 10.2" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 22H21" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>                                
                    </Icon>
                {/if }
            </slot>
            </Textfield>

            <Textfield
                editable={ confirmationPasswordEditable }
                title="Enter a new password"
                bind:error={ newPasswordError }
                bind:value={ newPassword }
                placeholder="Create a new login password"
                type={ showNewPassword ? "text" : "password" }
                required={ true }
                requiredError="Create a new login password"
            >   
            <slot slot="action">
                { #if confirmationPasswordEditable }
                    <slot>    
                        <Icon handleClick={ () => { newPassword = ""; confirmationPasswordEditable = false; newPasswordError = "" } }>
                            <svg width="24" style="stroke: #DF3F5A !important" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.3033 16.9099L16.9099 6.30327M6.3033 6.30327L16.9099 16.9099" stroke="#363853" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                        </Icon>
        
                        <Icon handleClick={ () => { showNewPassword = !showNewPassword } }>
                            { #if showNewPassword }
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
                    </slot> 
                { :else }
                    <slot></slot>
                {/if }
            </slot>
            </Textfield>

            <button on:click={ () => updateUserPassword() } disabled={ updatePasswordError } class="tertiary" style="z-index: 1; position: absolute; left: 50%; bottom: -2.8rem; transform: translate(-50%, 0%);">Update Password</button>
        </div>

        

        <div class="actions">
            <button on:click={ () => { auth.signOut(); }} class="secondary">Sign Out</button>
            <button on:click={ () => wipeUser() } class="">Delete Account</button>
        </div>
        
    </section>


</main>

<style lang="scss">
    @use "$lib/interface/variables" as app;
    
    main {
        padding-top: 5rem;
        padding-bottom: 8rem;
        min-height: calc(100vh - 12rem);
    }

    main > section {
        margin: 0px 8vw;
    }


    section#type {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        margin-top: 3rem;
        margin-bottom: 1rem;

        p {
            position: relative;
            padding: 0.3rem 1rem;
            border-radius: 0.5rem;

            &::after {
                position: absolute;
                top: 0px;
                bottom: 0px;
                left: 0px;
                right: 0px;

                content: "";
                z-index: -1;
                background-color: app.$color-shade;
                opacity: 30%;
                border-radius: 1rem;
            }
        }
    }

    section#account {

        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        gap: 1rem 4vw;

        @media screen and (max-width: 960px) {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr;
        }

        div.profile {

            div.icons {
                display: grid;
                grid-template-columns: 8rem 4rem 8rem;
                grid-template-rows: 8rem 1.5rem;
                gap: 1rem 0px;
            }

            div.icons > div:nth-child(1),
            div.icons > div:nth-child(3) { 
                border-radius: 5rem;
                border: 1px solid app.$color-shade;
            }

            div.icons > div:nth-child(2) {
                display: flex;
                align-items: center;
                justify-content: center;
                fill: transparent;
            }

            div.icons > :global(h4) {
                grid-column: span 3;
                font-weight: app.$weight-semibold;
                color: app.$color-midground;
            }

            div.name {
                margin: 2rem 0px;
                gap: 0.5rem;

                display: flex;
                flex-direction: column;
                justify-content: flex-start;

                > *:nth-child(1) {
                    font-size: 170%;
                }

                > *:nth-child(2) {
                    font-size: 240%;
                }
            }

        }


        div.progress {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: max-content max-content;
            gap: 1rem 1rem;

            margin: auto 0px;

            > div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 0.5rem;
                padding: 1rem 1rem;

                border: 1px dashed #aaaab2;
                border-radius: 0.5rem;
            }
        }
    }

    section#requests {


        div.grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            grid-auto-rows: 1fr;
            gap: 1rem 1rem;
        }
    }

    section#join {
        display: flex;
        flex-direction: column;
        align-items: center;

        margin-bottom: 8rem;

        a {
                margin-top: 1rem;
            }

        div.thumbnail {
            height: 15rem;
            display: flex;
            align-items: center;
            justify-content: center;

            margin-bottom: 2rem;
        }
    }

    section#user {
        border-top: 1px dashed app.$color-midground;
        display: flex;
        flex-direction: column;
        gap: 0rem;

        h3 {
            margin-top: 1rem;
            margin-bottom: 0.5rem;
        }
        
        div#info {
            position: relative;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr;
            gap: 1rem 1rem;
            margin-bottom: 1.5rem;
            
            @media screen and (max-width: 480px) {
                grid-template-rows: 1fr 1fr;
                grid-template-columns: 1fr;
            };

            :global(input[readonly]) {
                color: app.$color-midground;
            }
        }

        div.actions {
            margin-top: 5rem;
            display: flex;
            justify-content: center;
            gap: 1rem;

            button {
                transition: all linear 300ms;
            }

            button:nth-child(2) {
                color: app.$color-background;
                // border: 1px solid app.$color-error;
                background-color: app.$color-error;


                &:hover {
                    color: black;
                }
            }
        }

        
    }
</style>


