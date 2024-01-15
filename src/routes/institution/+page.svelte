
<script lang="ts">
    import { database } from "$lib/firebase/app";
    import Icon from "$lib/interface/Icon.svelte";
    import type { Institution, InstitutionRequest, MiniInstitution } from "$lib/models/app";
    import { user } from "$lib/functions/authentication";
    import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, limit, query, updateDoc } from "firebase/firestore";
    import { onMount } from "svelte";
    import { sendNotification } from "$lib/utilities/notifications";

    
    export let data;
    const { schools } = data;
    let request : Institution | undefined = undefined;

    $: filtered = 
        (request) ? 
            schools.filter((inst) => inst.id !== request!.id)
        : schools; 
    

    onMount(() => {
        request = $user.request
    })

    async function sendRequest(school: Institution) {
        try {
            const userID = $user.id;
            const updateUser = updateDoc(doc(database, "users", userID), {
                request: school.id
            });

            const updateInstitution = updateDoc(doc(database, "institution", school.id), {
                joinRequests: arrayUnion({ id: $user.id, email: $user.email, pfp: $user.photoURL, name: ($user.firstName + " " + $user.lastName) })
            });

            const notifyAdmin = updateDoc(doc(database, "users", userID), {
                request: school.id
            });


            await Promise.all([updateUser, updateInstitution]);
            
            request = school;

            sendNotification({ type: "info", message: `Sent join request to @${ school.id }. Wait to get approved by their admin`}, 8000);


        } catch (error) {
            console.error(error)
        }
        
    }

    async function revokeRequest(school: Institution | undefined) {

        if (!school) { return; }

        const userID = $user.id;
        const updateUser = updateDoc(doc(database, "users", userID), {
            request: null
        });

        const updateInstitution = updateDoc(doc(database, "institution", school.id), {
            joinRequests: arrayRemove({ id: $user.id, email: $user.email, pfp: $user.photoURL, name: ($user.firstName + " " + $user.lastName) })
        });

        await Promise.all([updateUser, updateInstitution]);
        
        request = undefined;
    }
</script>
    
<main>
    { #if  $user.email !== "" && !$user.institution }
        <section id="join">
            <h1>Join an institution</h1>
            <h4>Unlock unparalleled access to educational courses & lessons tailored for expertise in any area</h4>

            <div class={ request ? "grid request" : "grid" } >
                { #if request !== undefined }
                    <button class="campus select drop-shadow show" style="margin-bottom: 0rem;">
                        <div class="pfp"><img src={ request.pfp ? request.pfp : "/icons/institution.png" } alt=""></div>
                        <div class="info">
                            <h5>{ request.name }</h5>
                            <h6>@{ request.id }</h6>
                        </div>

                        <button on:click={ () => { revokeRequest(request) }} class="secondary">Cancel</button>
                    </button>
                {/if }

                { #each filtered as campus }
                <button class="campus" >
                    <div class="pfp"><img src={ campus.pfp ? campus.pfp : "/icons/institution.png" } alt=""></div>
                    <div class="info">
                        <h5>{ campus.name }</h5>
                        <h6>@{ campus.id }</h6>
                    </div>

                    { #if request == undefined }
                    <button on:click={ () => { sendRequest(campus) }} class="tertiary">Join</button>
                    { :else }
                    <span></span>
                    {/if }
                </button>
                {/each }                    

            </div>

            { #if request }
                <div style="margin: 2rem 0px 0px 0px"><p style="text-align: center;">Waiting for { request.name }'s administration to approve your request to join</p></div>
            { /if }

        </section>
    { :else }

        <section id="hero">

            <div id="content">

                <h1>{ $user.institution?.name }</h1>
                <p>We thank you for being a student at our wonderful school and hope that you excel. If have any questions or concerns, please do not hesitate to reach out to one of your teachers or the administrator. If you want to view your registered courses or lessons, click on the buttons below. </p>

                <div class="info">
                    <div class="chip">
                        <Icon frame={[1.3,1.3]}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.1197 12.78C12.0497 12.77 11.9597 12.77 11.8797 12.78C10.1197 12.72 8.71973 11.28 8.71973 9.50998C8.71973 7.69998 10.1797 6.22998 11.9997 6.22998C13.8097 6.22998 15.2797 7.69998 15.2797 9.50998C15.2697 11.28 13.8797 12.72 12.1197 12.78Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                    
                        </Icon>
        
                        <p>Admin: { $user.institution?.admin }</p>
                    </div>


                    <div class="chip">
                        <Icon frame={[1.3,1.3]}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.0495 2.52979L4.02953 6.45979C2.09953 7.71979 2.09953 10.5398 4.02953 11.7998L10.0495 15.7298C11.1295 16.4398 12.9095 16.4398 13.9895 15.7298L19.9795 11.7998C21.8995 10.5398 21.8995 7.72979 19.9795 6.46979L13.9895 2.53979C12.9095 1.81979 11.1295 1.81979 10.0495 2.52979Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.63012 13.0801L5.62012 17.7701C5.62012 19.0401 6.60012 20.4001 7.80012 20.8001L10.9901 21.8601C11.5401 22.0401 12.4501 22.0401 13.0101 21.8601L16.2001 20.8001C17.4001 20.4001 18.3801 19.0401 18.3801 17.7701V13.1301" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21.4004 15V9" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                                           
                        </Icon>
        
                        <p>{ $user.institution?.students } students</p>
                    </div>


                    <div class="chip">
                        <Icon frame={[1.3,1.3]}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 16.7402V4.67019C22 3.47019 21.02 2.58019 19.83 2.68019H19.77C17.67 2.86019 14.48 3.93019 12.7 5.05019L12.53 5.16019C12.24 5.34019 11.76 5.34019 11.47 5.16019L11.22 5.01019C9.44 3.90019 6.26 2.84019 4.16 2.67019C2.97 2.57019 2 3.47019 2 4.66019V16.7402C2 17.7002 2.78 18.6002 3.74 18.7202L4.03 18.7602C6.2 19.0502 9.55 20.1502 11.47 21.2002L11.51 21.2202C11.78 21.3702 12.21 21.3702 12.47 21.2202C14.39 20.1602 17.75 19.0502 19.93 18.7602L20.26 18.7202C21.22 18.6002 22 17.7002 22 16.7402Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 5.49023V20.4902" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M7.75 8.49023H5.5" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8.5 11.4902H5.5" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                
                        </Icon>
        
                        <p>{ $user.institution?.courses.length } courses offered</p>
                    </div>

                </div>

                <div id="links">
                    <a href="/course" class="button secondary">View courses</a>
                    <a href="/lesson" class="button tertiary">View lessons</a>

                </div>


            </div>

            <div id="graphic">
                <img src="/images/school.webp" alt="">
                <div id="backdrop"></div>
            </div>
            



        </section>
    { /if }

</main>

<style lang="scss">
    @use "$lib/interface/variables" as app;

    main {
        padding: 4rem 5vw 2rem 5vw;
        
        min-height: calc(100vh - 10rem);

        display: flex;
        flex-direction: column;

        

        section#hero {
            margin-bottom: 3rem;
            align-self: center;
           
            padding: 0px 5vw 0px 0px;
            margin-top: 5rem;
            display: flex;
            flex-direction: row;
            gap: 3rem;

            

            div#content {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 2rem;

                padding-top: 1.5rem;


                div.info {
                    margin-left: 0.5rem;

                    display: flex;
                    flex-direction: column;
                    gap: 0.3rem;

                    svg { stroke: app.$color-midground; }
                }

                h1 {
                    font-size: 2rem;
                    font-family: app.$typeface-heading;
                }

                
            }
            
            div#graphic {
                flex: 1;
                position: relative;

                img {
                    width: 100%;
                    border-radius: 1.5rem;
                    position: relative;
                    z-index: 1;
                    margin-top: 1rem;

                    transform: translate(0%, 10%);

                }
            }
                div#backdrop {
                    border-radius: 1.5rem;
                    width: 100%;
                    height: 90%;
                    bottom: 15%;
                    left: 10%;
                    position: absolute;
                    z-index: -1;
                    background-color: app.$color-brand;
                    opacity: 10%;

                }
            }
            @media screen and (max-width: 1180px) {
                section#hero {
                    flex-direction:column-reverse;
                    margin-bottom: 3rem;
                    align-self: center;
                    align-items: center;
                    margin-top: 1rem;
                    display: flex;
                    gap: 3rem;
                    padding: 0px 5vw 0px 5vw;



                    div#graphic {

                        margin-bottom: 3rem;
                        
                        img {
                            width: 100%;
                            position: relative;
                            z-index: 1;

                        }

                        div#backdrop {
                            width: 100%;
                            height: 90%;
                            position: absolute;
                            z-index: -1;
                            background-color: app.$color-brand;
                            opacity: 50%;

                            filter: blur(1rem);

                            left: 0px;
                            bottom: -5%;
                            transform: scale(1.1);
                            background-image: url("/images/school.webp");


                        }
                    }

                }
            }

        

        
    
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
                            display: none;
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
                        background-color: app.$color-elevate;
                        border: 1px solid app.$color-shade;

                        transition-property: all;
                        transition-duration: 150ms;
                        transition-timing-function: ease-in;

                        color: unset;
                        width: unset;

                        text-align: start;

                        &.select {
                            background-color: app.$color-elevate;
                            border: none !important;

                        }
                        

                        &:hover {
                            border: 1px dashed transparent;
                            box-shadow: 0 0 1.5rem #282a3614;
                        }

                        img { border-radius: 0.5rem; }
                        h6 { color: app.$color-midground }
                    }
                    
                    div.pfp { height: 5rem; border: 1px solid app.$color-shade; border-radius: 0.8rem; }
                    button, div.info {
                        height: max-content;
                        margin: auto 0px;
                    }

                }
            }
        }


    }
</style>


