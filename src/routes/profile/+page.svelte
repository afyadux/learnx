


<script lang="ts">
    import Icon from "$lib/interface/Icon.svelte";
    import AuthSection from "$lib/sections/authSection.svelte";
    import Editable from "$lib/interface/Editable.svelte";
    import { user, type UserProfile } from "$lib/utilities/authentication";
    import Usercard from "$lib/cards/usercard.svelte";
    import Layout from "../auth/+layout.svelte";
    import { arrayRemove, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
    import { database } from "$lib/firebase/app";

    interface UserRequest {
        email: string, name: string, pfp: string 
    }

    let institutionalName: string = $user.institution?.name ? $user.institution.name : "No Institution Joined";
    let firstNameUI: string = $user ? $user.firstName : "";
    let lastNameUI: string = $user ? $user.lastName : "";

    let requestsUI : UserRequest[] = [];

    // Functions
    (async () => {

        if ($user.role !== "admin" || !$user.institution) { return; }
        const institutionID = $user.institution!.id!;

        const { joinRequests: requests } = (await getDoc(doc(database, "institution", institutionID))).data() as any; 
        requestsUI = requests;
    })();

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

    // - UI
    console.log($user); 


    
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
            />

                <Editable
                bind:value={ lastNameUI }
                type="h1"
                placeholder="Last Name"
                editable={ true }
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
</style>


