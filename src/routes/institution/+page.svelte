
<script lang="ts">
    import type { Institution } from "$lib/models/app";

    let request : Institution | undefined = undefined; 
    let schools : Institution[] = [{ pfp: "caltech.png", name: "California Institute of Technology" }, { pfp: "caltech.png", name: "California Institute of Technology" }];
</script>
    
<main>


    <section id="join">
        <h1>Join an institution</h1>
        <h4>Unlock unparalleled access to educational courses & lessons tailored for expertise in any area</h4>

        <div class={ request ? "grid request" : "grid" } >
            { #if request !== undefined }
                <div class="campus" style="margin-bottom: 4rem;">
                    <div class="pfp"><img src="/images/caltech.png" alt=""></div>
                    <div class="info">
                        <h5>California Institute of Technology</h5>
                        <h6>@caltech</h6>
                    </div>

                    <button class="secondary">Requested</button>
                </div>
                
                <span></span>
                <span></span>
            {/if }

            { #each schools as campus }
                <div class="campus">
                    <div class="pfp"><img src="/images/caltech.png" alt=""></div>
                    <div class="info">
                        <h5>California Institute of Technology</h5>
                        <h6>@caltech</h6>
                    </div>

                    { #if request == undefined }
                    <button class="tertiary">Join</button>
                    { :else }
                    <span></span>
                    {/if }
                </div>
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

                    &.request > div.campus:nth-child(4) {
                            

                        position: relative;
                        &::after {
                            position: absolute;
                            top: -2.5rem;
                            content: "Other Institutions";
                            font-weight: app.$weight-semibold;
                            font-size: 1.1rem;
                        };

                    }

                    div.campus {
                        padding: 0.8rem 0.8rem;

                        display: grid;
                        grid-template-columns: 5rem auto max-content;
                        gap: 1rem; 

                        border-radius: 1.5rem;
                        background-color: app.$color-background;
                        border: 1px solid app.$color-shade;

                        transition-property: all;
                        transition-duration: 150ms;
                        transition-timing-function: ease-in;

                        

                        &:hover {
                            border: 1px dashed transparent;
                            box-shadow: 0 0 1.5rem #282a3614;
                        }

                        img { border-radius: 0.8rem; }
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


