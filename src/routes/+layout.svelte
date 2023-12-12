


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

        background-color: app.$color-background;
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

            @media screen and (min-width: 640px) {
                display: flex;
            }

            display: none;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            transform: translateX(-50%);
            
        }

        span {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 1rem; 

            @media screen and (min-width: 640px) {
                > :global(button) { display: none }
            }
        };

        
    }

    section#toast {
        z-index: 20;

        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        height: 100dvh;

        background-color: transparent;
        pointer-events: none;

        @keyframes showNotification {
            0% {
                bottom: -20%;
            }
            10% {
                bottom: 0%;
            }
            100% {
                bottom: 3rem;
            }
        }

        @keyframes hideNotification {
            0% {
                bottom: 3rem;
            }
            50% {
                bottom: 0%;
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

            animation-name: hideNotification;
            animation-duration: 1200ms;
            animation-timing-function: linear;
            animation-fill-mode: forwards;

            color: app.$color-background;
            box-shadow: 0rem 0rem 1.5rem rgba(40, 42, 54, 0.08);

            padding: 0.25rem 2rem;
            border-radius: 2rem;

            &.show {
                bottom: 3rem;

                animation-name: showNotification;
                animation-duration: 600ms;
                animation-timing-function: linear;
                animation-fill-mode: forwards;
            }
        }
    }

    section#popup-nav {

        @media screen and (max-width: 640px) {
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
</style>

<script lang="ts">
    import { onMount } from "svelte";
    import "$lib/interface/app.scss";
    import Icon from "$lib/interface/Icon.svelte";

    import { page } from '$app/stores';
    import { NotificationState, notification, sendNotification } from "$lib/utilities/notifications";


    $: color = () => { 
        if ($notification === undefined) { return "transparent"; }

        switch ($notification.type) {
            case NotificationState.info:
                return "#3361FF";

            case NotificationState.error:
                return "#FF5E6E";

            case NotificationState.warning:
                return "#FF8800";

            case NotificationState.success:
                return "#2BD84E";

            default:
                return "#3361FF";
        }
    }

    let popup: HTMLElement;
    let showNavbar: boolean = false;
    const toggleNavbar = () => { showNavbar = !showNavbar };

    onMount(() => {
        popup.addEventListener(("click"), toggleNavbar);
    });

    console.log($page.url.pathname);


</script>


<nav>
    <a href="/" id="logo">
        <img src="/icons/dummylogo.png" alt="">
    </a>

    <div class="links">
        <a class={ $page.url.pathname === "/link" ? "highlight" : "" } href="/link">Link</a>
        <a class={ $page.url.pathname === "/link" ? "highlight" : "" } href="/link">Link</a>
        <a class={ $page.url.pathname === "/link" ? "highlight" : "" } href="/link">Link</a>
        <a class={ $page.url.pathname === "/course" ? "highlight" : "" } href="/course">courses</a>
    </div>

    <span>
        <a href="/hire" class="button">Call to Action</a>

        <Icon handleClick={ toggleNavbar }>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>                                             
        </Icon>
    </span>
</nav>

<slot></slot>


<section class={ showNavbar ? "show" : "" } id="popup-nav" bind:this={ popup }>

    <div class="links">
        <a href="/">Link</a>
        <a href="/">Link</a>
        <a href="/">Link</a>
        <a href="/course">Link</a>

        <div class="cite">
            <p>Copy &copy; 2023</p>
            <p>All rights reserved</p>
        </div>
    </div>

</section>

<section id="toast">
    <p style={ `background-color: ${ color() };` } class={ ($notification === undefined) ? "" : "show" }>{  ($notification === undefined) ? "" : $notification.message }</p>
</section>



