
<script lang="ts">
    let certs = Array(4);
</script>


<main id="certification">
    <h1>Certifications</h1>

    <section class="certs">
        { #if certs.length === 0 }
            <div class="empty" style="margin: 0px auto;">
                <div class="thumbnail"><img src="/images/empty/certification.png" alt=""></div>
                <h3>You have no certifications</h3>
                <p style="text-align: center;">Take all tests in a lesson and pass to get certified<p>
            </div>
        {/if }

        <div class="grid">
            { #each certs as certification }
            <a href={ `/certification/avatar` } class="project">
                <div class="thumbnail">
                    <img class="drop-shadow" src="/images/empty/cert.png" alt="">
                </div>
            
                <div class="info">
                    <p>Learning Avatar: The Last Airbender</p>
                    <span>
                        <p>Sep 14, 2023</p>
                        <p>11:24 PM</p>
                    </span>
                </div>
            </a>
        {/each }
        </div>
    </section>
</main>


<style lang="scss">
    @use "$lib/interface/variables" as app;


    main#certification {
        padding: 6rem 8vw 12rem 8vw;
        min-height: calc(100vh - 12rem);
    }

    section.certs {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;

        div.empty {
            max-width: 840px;
            margin: 0px auto;
            gap: 0.5rem;

            img { margin-bottom: 1rem; }
        }

        div.grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1rem 1rem;
            width: 100%;
        }

        a.project {
            width: 100%;
            border-radius: 0.8rem;

            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 10rem auto;

            background-color: app.$color-elevate;
            // filter: drop-shadow(0rem 1rem 3rem rgba(40, 42, 54, 0.08));

            div.thumbnail {
                width: 100%;
                height: 100%;
                position: relative;
                overflow: hidden;
            }

            .thumbnail > img {

                position: absolute;
                left: 50%;
                box-shadow: 0 0 1.5rem #282a3614;
                border-radius: 0.8rem 0.8rem 0px 0px;
                object-fit: cover;

                transform: translate(-50%, 30%);

                &::before {
                    content: "Certificate";

                    position: absolute;
                    top: 0px; 
                    color: red;
                }
            }

            .info {
                padding: 0.6rem 1rem;

                display: flex;
                flex-direction: column;
                justify-content: center;
                border-top: 0.5px solid app.$color-shade;

                > p:nth-child(1) { font-weight: app.$weight-bold; color: app.$color-foreground; }
            }

            .info > span {
                display: flex;
                justify-content: space-between;
                
                * { color: app.$color-midground; }
            }
        }
    }
</style>

