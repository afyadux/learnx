
<script lang="ts">
    import { database } from "$lib/firebase/app";
    import type { Institution, InstitutionRequest } from "$lib/models/app";
    import { user } from "$lib/utilities/authentication";
    import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
    import { onMount } from "svelte";

    

    let request : Institution | undefined = undefined; 
    let schools : Institution[] = [
        { id: "caltech", pfp: "caltech.png", name: "California Institute of Technology" },
        { id: "wunsche", pfp: "caltech.png", name: "Wunsche Institute of Pornography" },
        { id: "caltech", pfp: "caltech.png", name: "California Institute of Technology" },
    ];

    onMount(() => {


        request = $user.request
    })

    async function sendRequest(school: Institution) {
        
        const userID = $user.email;
        const updateUser = updateDoc(doc(database, "users", userID), {
            request: school.id
        });

        const updateInstitution = updateDoc(doc(database, "institution", school.id), {
            joinRequests: arrayUnion({ email: $user.email, pfp: $user.photoURL, name: ($user.firstName + " " + $user.lastName) })
        });

        await Promise.all([updateUser, updateInstitution]);
        
        request = school;
    }

    async function revokeRequest(school: Institution | undefined) {

        if (!school) { return; }

        const userID = $user.email;
        const updateUser = updateDoc(doc(database, "users", userID), {
            request: null
        });

        const updateInstitution = updateDoc(doc(database, "institution", school.id), {
            joinRequests: arrayRemove(userID)
        });

        await Promise.all([updateUser, updateInstitution]);
        
        request = undefined;
    }
</script>
    
<main>


    <section id="join">
        <h1>Join an institution</h1>
        <h4>Unlock unparalleled access to educational courses & lessons tailored for expertise in any area</h4>

        <div class={ request ? "grid request" : "grid" } >
            { #if request !== undefined }
                <button class="campus" style="margin-bottom: 4rem;">
                    <div class="pfp"><img src="/images/caltech.png" alt=""></div>
                    <div class="info">
                        <h5>California Institute of Technology</h5>
                        <h6>@caltech</h6>
                    </div>

                    <button on:click={ () => { revokeRequest(request) }} class="secondary">Cancel</button>
                </button>
                
                <span></span>
                <span></span>
            {/if }

            { #each schools as campus }
                <button class="campus" >
                    <div class="pfp"><img src="/images/caltech.png" alt=""></div>
                    <div class="info">
                        <h5>California Institute of Technology</h5>
                        <h6>@caltech</h6>
                    </div>

                    { #if request == undefined }
                    <button on:click={ () => { sendRequest(campus) }} class="tertiary">Join</button>
                    { :else }
                    <span></span>
                    {/if }
                </button>
            {/each }
        </div>
    </section>

</main>

<style lang="scss">
    @use "$lib/interface/variables" as app;

    main {
        padding-top: 4rem;
        min-height: calc(100vh - 12rem);

        display: flex;
        flex-direction: column;


        section {
            max-width: 1280px;
            margin: 0px auto;
            width: 100%;

            &#join {
                margin-top: 2rem;

                h1 { margin-bottom: 1rem; }

                > * {
                    font-family: app.$typeface-heading;
                }

                div.grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
                    gap: 1rem 1rem;

                    margin-top: 2rem;

                    &.request > button.campus:nth-child(4) {
                            

                        position: relative;
                        &::after {
                            position: absolute;
                            top: -2.5rem;
                            content: "Other Institutions";
                            font-weight: app.$weight-semibold;
                            font-size: 1.1rem;
                        };

                    }

                    button.campus {
                        padding: 0.8rem 0.8rem;

                        display: grid;
                        grid-template-columns: 5rem auto max-content;
                        gap: 1rem; 

                        border-radius: 1.2rem;
                        background-color: app.$color-background;
                        border: 1px solid app.$color-shade;

                        transition-property: all;
                        transition-duration: 150ms;
                        transition-timing-function: ease-in;

                        color: unset;
                        width: unset;

                        text-align: start;

                        

                        &:hover {
                            border: 1px dashed transparent;
                            box-shadow: 0 0 1.5rem #282a3614;
                        }

                        img { border-radius: 0.5rem; }
                        h6 { color: app.$color-midground }
                    }
                    
                    div.pfp { height: 5rem; }
                    button, div.info {
                        height: max-content;
                        margin: auto 0px;
                    }

                }
            }
        }


    }
</style>


