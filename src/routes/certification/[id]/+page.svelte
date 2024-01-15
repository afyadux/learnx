





<script lang="ts">

</script>


<main id="certification">

    <section id="frame">
        <div class="imgs">
            <img src="/icons/dummylogo.png" alt="">
        </div>

        <h4 class="desc">Proudly Confers on</h4>
        <h1 class="name">Bonzu Pippinpaddle</h1>

        <h4 class="desc">A Cerfitication for the Completion of:</h4>
        <h2 class="course">Understanding Avatar</h2>

        <span>
            <p>Signed: Alfred James</p>
            <p>September 14, 2023</p>
        </span>
    </section>
</main>

<style lang="scss">
    @use "$lib/interface/variables" as app;
    

    main#certification {
        height: calc(100vh - 12rem);
        padding: 4rem 8vw 0px 8vw;



        display: flex;
        justify-content: center;
        align-items: center;

        > img {
            width: 450;
            height: 210px;
            position: absolute;;
        }

        section#frame {
            border: 1px solid gray;
            aspect-ratio: 16/9;
            border-radius: 1rem;

            position: relative;

            width: 840px;
            height: 420px;

            padding: 0px 4vw;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;


            div.imgs {
                display: flex;
                justify-content: space-between;
                margin-bottom: 1rem;

                :nth-child(1), :nth-child(3) {
                    height: 8vw;
                    max-height: 3rem;
                }
            }

            span {
                display: flex;
                justify-content: space-between;
                align-items: center;

                width: 100%;

                position: absolute;
                bottom: 1rem;
                padding: 0px 2rem;
                

                * { color: app.$color-midground; }
            }

            
            .name { font-family: app.$typeface-heading; margin: 0px 0px 2rem 0px;  }
            .desc { color: app.$color-midground; text-align: center; }
            .course { text-align: center; margin: 0.2rem 0px 0px 0px; line-height: 160%; }

            
        }
    }
</style>









