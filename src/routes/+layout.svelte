




<script lang="ts">
    import { onMount } from "svelte";
    import "$lib/interface/app.scss";
    import Icon from "$lib/interface/Icon.svelte";
    import { page } from '$app/stores';
    import { notification, sendNotification } from "$lib/utilities/notifications";
    import { onAuthStateChanged, signInWithEmailAndPassword, type User } from "firebase/auth";
    import { auth, database } from "$lib/firebase/app";
    import { doc, getDoc } from "firebase/firestore";
    import { updateUser, user } from "$lib/functions/authentication";

    $: color = () => { 

        if ($notification === undefined) { return ""; }

        switch ($notification.type) {
            case "info":
                return "#3361FF";

            case "error":
                return "#FF5E6E";

            case "warning":
                return "#FF8800";

            case "success":
                return "#2BD84E";

            default:
                return "#3361FF";
        }
    }

    let showNavbar: boolean = false;
    const toggleNavbar = () => { showNavbar = !showNavbar };

    function addToggleNavbar(node: HTMLElement) {
        node.addEventListener(("click"), toggleNavbar);
    }

    // - Authentication
    onAuthStateChanged(auth, () => {
        updateUser(auth.currentUser);
    });


    onMount(async () => {

    }); 
</script>

<svelte:head>
  <title>LearnX</title>
</svelte:head>


<nav>
    <a href="/" id="logo">
        <img src="/icons/logo.png" alt="">
    </a>

    <div class="links">
        <a class={ $page.route.id === "/course" ? "highlight" : "" } href="/course">Courses</a>
        <a class={ $page.route.id === "/lesson" ? "highlight" : "" } href="/lesson">Lessons</a>
        <a class={ $page.route.id === "/institution" ? "highlight" : "" } href="/institution">Institution</a>
        <a class={ $page.route.id === "/notifications" ? "highlight" : "" } href="/notifications">Notifications</a>
    </div>

    <span>

        
        <a class="button" href="/course">{ $user.role === "student" ? "Enroll in a Course" : "Create Course" }</a>

        <a href="/profile" id="pfp">
            <img src={ $user.photoURL ? $user.photoURL : "/icons/anonymous.png" } alt="">
        </a>

        <Icon id="dropdown" handleClick={ toggleNavbar }>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>                                             
        </Icon>
    </span>
</nav>

{ #if ($user.id === "" && $page.url.pathname.startsWith("/auth") === false) }
    <main id="auth">

        <h2>Make an account or sign in to get started</h2>

        <div>
            <img src="/images/empty/auth.png" alt="">
        </div>

        <div id="links">
            <h3>A world of infinate educational potential: just a few clicks away</h3>
            <h5>Sign in to securely access your classes & lessons</h5>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0px 1rem;">
            <a style="flex-grow: 1;" href="/auth/register" class="button">Create Account</a>
            <a style="width: 100%;" href="/auth/login" class="button secondary">Sign In</a>
        </div>

    </main>
{ :else }
    <slot></slot>
{/if }

<footer>

    <div id="logo">
        <img src="/icons/logo.png" alt="">
    </div>
    
    <div id="trail">
        <p>Made with &#x3C;&#x2764;&#x3E; for students &#x26; educators</p>
        <p>The Coding Initiative &copy; 2024</p>
    </div>
</footer>

<section class={ showNavbar ? "show" : "" } id="popup-nav" use:addToggleNavbar>

    <div class="links">
        <a class={ $page.route.id === "/course" ? "highlight" : "" } href="/course">Courses</a>
        <a class={ $page.route.id === "/lesson" ? "highlight" : "" } href="/lesson">Lessons</a>
        <a class={ $page.route.id === "/institution" ? "highlight" : "" } href="/institution">Institution</a>
        <a class={ $page.route.id === "/Notifications" ? "highlight" : "" } href="/notifications">Notifications</a>

        <div class="cite">
            <p>Copy &copy; 2023</p>
            <p>All rights reserved</p>
        </div>
    </div>

</section>

<section id="toast">
    <p style={ `background-color: ${ color() };` } class={ ($notification === undefined) ? "" : "show" }>{  ($notification === undefined) ? "" : $notification.message }</p>
</section>

<style lang="scss">
    @use "$lib/interface/variables" as app;

    nav a.highlight {
        position: relative;
        color: app.$color-brand;

        font-weight: app.$weight-bold;

        &::after {
            // content: "";

            position: absolute;
            bottom: -0.2rem;
            left: 50%;
            right: 0px;
            transform: translateX(-50%);

            height: 0.2rem;
            width: 0.2rem;
            background-color: app.$color-brand;
            border-radius: 0.5rem;
            
        }
    }


    nav {
        position: fixed; 
        top: 0px; 
        left: 0px; 
        right: 0px;
        z-index: 10;

        display: flex; 
        align-items: center; 
        justify-content: space-between;

        background-color: #FAFAFC;
        backdrop-filter: blur(1rem);
        padding: 0.3rem 5vw; 

        &::after {
            position: absolute;

            content: "";
            bottom: 0px;
            left: 0vw;
            right: 0vw;
            height: 1px;
            border-bottom: 0.5px dashed app.$color-brand;
        }

        #logo {
            // width: 2.8rem;
            height: 2.8rem;
            padding: 0.2rem;
            fill: app.$color-brand;
        }

        div.links {
            position: absolute;
            left: 50%;

            @media screen and (min-width: 940px) {
                display: flex;
            }

            display: none;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            transform: translateX(-50%);

            a {
                border-bottom: 1px solid transparent; /* Invisible border */
                transition: all 240ms ease-in-out;
                &:hover {
                    border-bottom-color: app.$color-brand;
            }
            }
            
        }

        span {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 0.8rem; 

            @media screen and (min-width: 940px) {
                > :global(button#dropdown) { display: none }
            }
        };

        a#pfp {
            width: 2.4rem;
            height: 2.4rem;
            border: 1px solid app.$color-shade;
            border-radius: 2rem;
            transition: box-shadow 240ms ease-in-out;
            overflow: hidden;


            &:hover {
                box-shadow: 0px 0px 2px 0px app.$color-brand;
            }
        }

        
    }

    section#toast {
        z-index: 20;

        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        height: 100dvh;
        pointer-events: none;

        @keyframes show {
            0% {
                bottom: -20%;
            }

            20% {
                bottom: 2rem;
            }

            90% {
                bottom: 2rem;
            }
            100% {
                bottom: -20%;
            }
        }

        p {
            position: absolute;
            bottom: -20%;
            left: 50%;
            transform: translateX(-50%);

            width: max-content;
            max-width: 90vw;

            text-align: center;

            color: app.$color-background;
            box-shadow: 0rem 0rem 1.5rem rgba(40, 42, 54, 0.08);

            padding: 0.25rem 2rem;
            border-radius: 2rem;

            &.show {
                animation-name: show;
                animation-duration: 6000ms;
                animation-timing-function: linear;
                animation-fill-mode: forwards;
            }
        }
    }

    section#popup-nav {

        @media screen and (max-width: 940px) {
            &.show {
                opacity: 100%;

                z-index: 5;
                > * { z-index: 6; }
            }
        }

        

        display: block;
        opacity: 0%;

        transition-duration: 300ms;
        transition-property: opacity;
        transition-timing-function: ease-in;

        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        width: 100vw;
        height: 100vh;

        z-index: -1;
        > * { z-index: -1; }


        -webkit-backdrop-filter: blur(1rem);
        backdrop-filter: blur(1rem);
        background-color: rgb(255, 255, 255, 0.2);

        padding-top: 4rem;



        div.links {

            position: relative;

            height: 100svh;

            padding: 0px 5vw;

            display: flex;
            flex-direction: column; 
            align-items: flex-end;
            justify-content: center;
            gap: 0.5rem;

            transform: translateY(-4rem);

            div.cite {
                position: absolute;
                bottom: 0px;
                left: 0px;
                right: 0px;

                display: flex;
                align-items: center;
                justify-content: space-between;

                margin: 1rem 5vw;
            }

            > a {
                position: relative;
                font-size: 180%;
                font-weight: app.$weight-bold;

                padding: 0.5rem 0px 0.5rem 2rem;

            
            }

            
        }
    }

    main#auth {
        height: calc(100vh - 10rem);
        padding-top: 4rem;

        display: flex;
        flex-direction: column;
        justify-content: center;

        @media screen and (max-width: 640px) {
            padding: 4rem 5vw 0px 5vw;
            gap: 0.5rem;
        }

        * { text-align: center; }
        
        div {
            max-width: 800px;
            margin: 0px auto;
        }

        h2 {
            margin: 0px auto;
        };

        > div:nth-child(2) {
            height: 40%;

            display: flex;
            align-items: center;
            justify-content: center;

            // margin-top: 2rem;
        }

        div#links {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;

            > * { text-align: center; width: 100%; }
        }
    }

    footer {
        background-color: #D3D7F5;
        padding: 2rem 4vw 2rem 4vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1rem;
        height: 10rem;

        #logo {
            height: 3rem;
        }

        #logo img {
            max-height: 100%;
            max-width: 100%;
        }

        #trail {
            margin: 0rem 0px;
            display: flex;
            justify-content: space-between;
        }

        #trail p {
            color: app;
            font-size: .8rem;
        }
       
    }

    
</style>






