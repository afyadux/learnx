


<style lang="scss">

@use "$lib/interface/variables" as app;



    div.card {
        height: max-content;
        padding: 0rem 0rem 0rem 0rem;

        display: grid;
        grid-template-rows: 13.5rem max-content;
        grid-template-columns: 1fr;
        gap: 0rem;

        border-radius: 1rem;
        border: 0.5px solid app.$color-shade;
        background-color: app.$color-background;

        overflow: hidden;


        img {
            width: 100%;
            object-fit: cover;
        }



        div.inspector {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            gap: 0.3rem;

            padding: 0.5rem 0px;
            
            height: max-content;
            > h3 {
                font-weight: app.$weight-semibold; margin: 0px 1.5rem; 
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1; /* number of lines to show */
                        line-clamp: 1; 
                -webkit-box-orient: vertical;
            }


            div.info {
                display: grid;
                grid-template-columns: 1.5rem 1fr 1.5rem 1fr;
                grid-template-rows: 1fr;
                gap: 0px 0.2rem;

                margin: 0px 1.25rem;

                fill: none;
                stroke: 3;

                > :global(button) {
                    margin: auto auto;
                    scale: 0.9;
                }

                > p:nth-child(3) { text-align: end; }
            }
        }
    }
</style>

<script lang="ts">
    import Icon from "$lib/interface/Icon.svelte";
    import type { IEvent } from "$lib/models/event";

    export let event : IEvent;

</script>


<div class="card">
    <img src={ `/icons/${ event.thumbnail }` } alt="">            
    <div class="inspector">
        <h3 class="truncated">{ event.organization }</h3>
        
        <div class="info">
            <Icon>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path id="Stroke 1" fill-rule="evenodd" clip-rule="evenodd" d="M14.5 10.5005C14.5 9.11924 13.3808 8 12.0005 8C10.6192 8 9.5 9.11924 9.5 10.5005C9.5 11.8808 10.6192 13 12.0005 13C13.3808 13 14.5 11.8808 14.5 10.5005Z" stroke="#1C1C28" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path id="Stroke 3" fill-rule="evenodd" clip-rule="evenodd" d="M11.9995 21C10.801 21 4.5 15.8984 4.5 10.5633C4.5 6.38664 7.8571 3 11.9995 3C16.1419 3 19.5 6.38664 19.5 10.5633C19.5 15.8984 13.198 21 11.9995 21Z" stroke="#1C1C28" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>                                                     
            </Icon>
            <p>12 days</p>

            <Icon>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 7V12H17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>                 
            </Icon>
            <p>{ event.location }</p>

            
        </div>
    </div>
</div>


