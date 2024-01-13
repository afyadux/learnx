

<script lang="ts">
    import Coursecard from "$lib/cards/coursecard.svelte";
    import Icon from "$lib/interface/Icon.svelte";
    import type { CourseData } from "$lib/models/app";
    import { user } from "$lib/utilities/authentication.js";

    let autoToggle = true;
    let focusIndex = 0;
    let containerWidth : number = 0;

    export let courses: CourseData[]; 

</script>

<section id="hero">

    <div class="canvas">
        <div class="info" >
            <h1 id="title">Unlock Your Potential: Master <span>{ courses[focusIndex]?.tag ? courses[focusIndex].tag : "Learning" }</span>, Shape Your Future!</h1>
            <p>Welcome to your journey of discovery and growth! Our courses, designed to be both engaging and enlightening, promises to transform the way you view and interact with the world around you. With a blend of interactive lessons, real-world examples, and innovative tools, we aim to ignite your passion for learning and personal development.</p>
        </div>

        <div class="graphic" bind:clientWidth={ containerWidth }>
        <div class="content">
            { #if courses.length === 0 }
                <div class="empty">
                    <div class="thumbnail"><img src="/images/empty/class.png" alt=""></div>
                    <h3>You are not { $user.role === "student" ? "enrolled in" : "teaching" } any courses</h3>
                    <p style="text-align: center;">{ $user.institution ? `Check out ${ $user.institution.name }'s tutorials by clicking "courses" above'` : "" }</p>
                </div>
            {/if }

            { #each courses as item,index }
                <div class={ `container${ (index < focusIndex) ? " hidden" : "" }` }
                    style={ `--displacement: ${ index < focusIndex ? -(containerWidth) * index : -(containerWidth) * focusIndex  };` }>
                    <Coursecard course={ item }  />
                </div>
            {/each } 
        </div>
        </div>
    </div>

    <div class="controls">

        <div class="pagination">
        { #each courses as _, index }
            <span class={ index === focusIndex ? "active" : "" }></span>
        {/each }
        </div>

        <div class="cta">
            <a href="/course" class="button secondary" id="cta">All Courses</a>
            <a href="/lesson" class="button tertiary" id="cta">All Lessons</a>
        </div>

        <div class="arrows">
            <Icon handleClick={ () => { focusIndex--; if (autoToggle) { autoToggle = false; } }} disabled={ focusIndex === 0 }>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.57 5.93005L3.5 12.0001L9.57 18.0701" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M20.5 12H3.66998" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </Icon>

            <Icon handleClick={ () => { focusIndex++; if (autoToggle) { autoToggle = false;  }} } disabled={ focusIndex >= courses.length -1 }>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.43 5.93005L20.5 12.0001L14.43 18.0701" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M3.5 12H20.33" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </Icon>
        </div>


    </div>
</section>


<style lang="scss">
    @use "$lib/interface/variables" as app;

    section#hero {
        position: relative;
        height: calc(100svh - 4rem);

        overflow: hidden hidden;


        div.canvas {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1.5fr;

            gap: 1rem 2rem;

            @media screen and (min-width: 1024px) {
                grid-template-columns: 1fr 1fr;
                grid-template-rows: 1fr;

            }

            height: 100%;
            padding: 0rem 6vw 4.5rem 6vw;

            div.info {

                display: flex;
                flex-direction: column;
                justify-content: center;

                width: 100%;
                gap: 1rem;
                padding-right: 2rem;

                span { color: app.$color-brand; };

                #title {
                    font-size:120%;
                    line-height: 150%;
                    font-weight: app.$weight-semibold;
                    font-family: app.$typeface-heading;

                    span { font-size: inherit; font-family: app.$typeface-heading; }

                    @media screen and (min-width: 960px) {
                        font-size: 180%;
                        font-weight: app.$weight-bold;
                    }
                }

                > p {
                    line-height: 150%;
                    // font-size: 110%;

                    @media screen and (min-width: 960px) {
                        font-size: 124%;
                        // font-weight: app.$weight-bold;
                    }
                }
            }

            div.graphic {


                position: relative;

                div.content {
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    bottom: 0px;

                    display: flex;
                    align-items: flex-start;
                    justify-content: flex-start;

                    @media screen and (max-width: 960px) {
                        top: 0vh;
                    }

                    div.empty {
                        margin: auto 0px;
                        gap: 1rem 0px;
                    }
                }

                div.container {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    padding: 0px 0.5rem;

                    width: calc(42vw - 4rem);
                    height: 90%;

                    transition-property: transform opacity;
                    transition-duration: 300ms;
                    transition-timing-function: ease-in;

                    margin: 0px 0.5rem;
                    opacity: 100%;
                    transform: matrix(1, 0, 0, 1, var(--displacement), 0);

                    > :global(div) {
                        width: 90%;
                        height: 80%;
                        background-color: app.$color-background;
                        filter: drop-shadow(0rem 1rem 3rem rgba(40, 42, 54, 0.08));
                    }

                    :global(div.inspector) {
                        margin: 0.8rem 0.5rem;
                        gap: 0.5rem;
                        height: 6rem;
                       
                    }

                    :global(#topic-icon) {
                        width: 12vmax;
                        max-width: 160px;
                    }

                    :global(.card) {
                        gap: calc(2rem + 3vmax) 0px;
                        margin-left: 5vw;
                        transform: scale(1.15);
                    }



                    @media screen and (min-width: 1200px) {
                        > :global(a) {
                        grid-template-rows: 16rem 5rem;
                        }
                    }

                    @media screen and (min-width: 720px) {
                        :global(.card) {
                        transform: scale(1.15);
                        }
                    }

                    

                    @media screen and (max-width: 540px) {
                        width: calc(92vw - 2rem);
                        
                    }



                    transition-property: transform opacity;
                    transition-duration: 300ms;
                    transition-timing-function: ease-in;

                    margin: 0px 0.5rem;
                    opacity: 100%;
                    transform: matrix(1, 0, 0, 1, var(--displacement), 0);

                
                    transition-property: transform opacity;
                    transition-duration: 300ms;
                    transition-timing-function: ease-in;

                    margin: 0px 0.5rem;
                    opacity: 100%;
                    transform: matrix(1, 0, 0, 1, var(--displacement), 0);

                    @media screen and (min-width: 960px) {
                        transform: matrix(1, 0, 0, 1, calc(var(--displacement) * 0.9), 0);
                        &.hidden { transform: matrix(0.9, 0, 0, 0.9, calc(var(--displacement) * 0.9), 0); opacity: 0%; }
                    }

                    // &:nth-child(1) { margin-left: 0rem; }
                    &.hidden { transform: matrix(0.9, 0, 0, 0.9, var(--displacement), 0); opacity: 0%; }
                }
            }

        }

        div.controls {
            position: absolute;
            bottom: 1rem;
            left: 0px;
            right: 0px;

            padding: 0px 1rem;

            display: flex;
            align-items: center;
            justify-content: space-between;

            fill: none;


            @media screen and (min-width: 420px) {
                padding: 2rem 6vw;
            }

            div.pagination {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 0.75rem;

                span { position: relative; width: 0.3rem; height: 0.3rem; background-color: app.$color-midground; border-radius: 2rem; }
                span.active { margin: 0rem 0.5rem; }
                span.active::after {
                    content: "";
                    position: absolute;
                    z-index: 5;
                    width: 1.2rem;
                    height: 1.2rem;
                    background-color: transparent;
                    border: 1px solid app.$color-midground;
                    border-radius: 100%;

                    top: 50%;
                    left: 50%;
                    transform: translateX(-50%) translateY(-50%);
                }
            }

            div.cta {
                display: flex;
                align-items: center;
                gap: 1rem;

                position: absolute;
                
                top: -150%;
                transform: translateY(-50%) translateX(-50%);
                left: 50%;


                @media screen and (min-width: 580px) {
                    top: 50%;
                    transform: translateY(-50%) translateX(-50%);
                }
            }

            div.arrows {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                gap: 0.5rem;
            }
        }
    }

    #cta:hover {
         box-shadow: 0 0 3px 0;
    }
</style>
