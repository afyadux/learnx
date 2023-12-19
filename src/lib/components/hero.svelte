


<style lang="scss">
    
    @use "$lib/interface/variables" as app;
    

    section#hero {
        position: relative;
        height: calc(100dvh - 4rem);

        overflow: hidden;

        div.canvas {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr;

            gap: 1rem 2rem;

            @media screen and (min-width: 1024px) {
                grid-template-columns: 1fr 1fr;
                grid-template-rows: 1fr;

            }

            height: 100%;
            padding: 2rem 8vw 6rem 8vw;

            div.info {

                display: flex;
                flex-direction: column;
                justify-content: center;

                gap: 3vmax;

                #title {
                    font-size: 320%;
                    font-weight: app.$weight-regular;
                }

                > p {
                    line-height: 164%;
                    font-size: 110%;
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
                    align-items: center;
                    justify-content: flex-start;
                   
                }

                div.container {
                    display: flex;
                    align-items: center;
                    justify-content: center;

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

                    width: calc(42vw - 4rem);
                    height: 24rem;
                    // border: 1px solid red;


                    transition-property: transform opacity;
                    transition-duration: 300ms;
                    transition-timing-function: ease-in;

                    margin: 0px 0.5rem;
                    opacity: 100%;
                    transform: matrix(1, 0, 0, 1, var(--displacement), 0);

                    &:nth-child(1) { margin-left: 1rem; }
                    &.hidden { transform: matrix(0.9, 0, 0, 0.9, var(--displacement), 0); opacity: 0%; }
                }
            }

        }

        div.controls {
            position: absolute;
            bottom: 0px;
            left: 0px;
            right: 0px;

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

                span { position: relative; width: 0.3rem; height: 0.3rem; background-color: app.$color-tint; border-radius: 2rem; }
                span.active { margin: 0rem 0.5rem; }
                span.active::after {
                    content: "";
                    position: absolute;
                    z-index: 5;
                    width: 1.5rem;
                    height: 1.5rem;
                    background-color: transparent;
                    border: 1px solid app.$color-shade;
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
                
                top: 0%;
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


<script lang="ts">

    import Icon from "$lib/interface/Icon.svelte";
    import events from "$lib/data/event.json";
    import Coursecard from "$lib/cards/coursecard.svelte";


    let autoToggle = true;
    let focusIndex = 0;

    let containerWidth : number = 0;

    

  

</script>

<section id="hero">

    <div class="canvas">
        <div class="info">
            <h1 id="title">Blood Drive event hosted by: { events[focusIndex].organization }</h1>
            <p>Discover life-saving opportunities near you! Our website connects you with local blood donation events, making it easy to give back to your community. Join us in the mission to save lives, one drop at a time. Find nearby events, schedule appointments, and be a hero today. Your donation can make a world of difference!</p>
        </div>

        <div class="graphic" bind:clientWidth={ containerWidth }>
            <div class="content">
                { #each events.slice(0, 4) as event, index }
                    <div class={ `container${ (index < focusIndex) ? " hidden" : "" }` }
                        style={ `--displacement: ${ index < focusIndex ? -(containerWidth - 40) * index : -(containerWidth - 40) * focusIndex  }` }>
                    <Coursecard event={ event } />
                    </div>
                {/each } 
            </div>
        </div>
    </div>

    <div class="controls">

        <div class="pagination">
        { #each events.slice(0, 4) as _, index }
            <span class={ index === focusIndex ? "active" : "" }></span>
        {/each }
        </div>

        <div class="cta">
            <a href="/events" class="button tertiary" id="cta">All Events</a>
            <a href="/guides" class="button secondary" id="cta">View Tips</a>
        </div>

        <div class="arrows">
            <Icon handleClick={ () => { focusIndex--; if (autoToggle) { autoToggle = false; } }} disabled={ focusIndex === 0 }>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.57 5.93005L3.5 12.0001L9.57 18.0701" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M20.5 12H3.66998" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </Icon>

            <Icon handleClick={ () => { focusIndex++; if (autoToggle) { autoToggle = false;  }} } disabled={ focusIndex === (events.slice(0, 4).length - 1) }>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.43 5.93005L20.5 12.0001L14.43 18.0701" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M3.5 12H20.33" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </Icon>
        </div>


    </div>
</section>


