

<script lang="ts">
    import Lessoncard from "$lib/cards/lessoncard.svelte";
    import Icon from "$lib/interface/Icon.svelte";

</script>

<main>

    <article id="showcase">

        <div>
            <h6>&#35;chemistry</h6>
            <h1>Chemistry Unveiled: Understanding the World Around Us</h1>
            <div class="instructor">
                <img src="/icons/instructor.png" alt="">
                <p>Mrs. Gangi</p>
            </div>
        </div>
        <div>
            <img src={ `/images/thunderhead.jpeg` }  alt="">
        </div>


        <div>
            <div class="nuggets">
                <div>
                    <h6>Lessons</h6>
                    <p>12</p>
                </div>
                <div>
                    <h6>Difficulty</h6>
                    <p>Intermediate</p>
                </div>
            </div>


            <div class="info">
                <div class="chip">
                    <Icon frame={[1.3,1.3]}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.1197 12.78C12.0497 12.77 11.9597 12.77 11.8797 12.78C10.1197 12.72 8.71973 11.28 8.71973 9.50998C8.71973 7.69998 10.1797 6.22998 11.9997 6.22998C13.8097 6.22998 15.2797 7.69998 15.2797 9.50998C15.2697 11.28 13.8797 12.72 12.1197 12.78Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>                    
                    </Icon>
    
                    <p>12 students</p>
                </div>


                <div class="chip">
                    <Icon frame={[1.3,1.3]}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.75 13.25C20.75 18.08 16.83 22 12 22C7.17 22 3.25 18.08 3.25 13.25C3.25 8.42 7.17 4.5 12 4.5C16.83 4.5 20.75 8.42 20.75 13.25Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 8V13" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 2H15" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>                                             
                    </Icon>
    
                    <p>8 hrs</p>
                </div>


                <div class="chip">
                    <Icon frame={[1.3,1.3]}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.25977 11.0199V15.9899C4.25977 17.8099 4.25977 17.8099 5.97977 18.9699L10.7098 21.6999C11.4198 22.1099 12.5798 22.1099 13.2898 21.6999L18.0198 18.9699C19.7398 17.8099 19.7398 17.8099 19.7398 15.9899V11.0199C19.7398 9.19994 19.7398 9.19994 18.0198 8.03994L13.2898 5.30994C12.5798 4.89994 11.4198 4.89994 10.7098 5.30994L5.97977 8.03994C4.25977 9.19994 4.25977 9.19994 4.25977 11.0199Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17.5 7.63V5C17.5 3 16.5 2 14.5 2H9.5C7.5 2 6.5 3 6.5 5V7.56" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.6298 10.99L13.1998 11.88C13.2898 12.02 13.4898 12.16 13.6398 12.2L14.6598 12.46C15.2898 12.62 15.4598 13.16 15.0498 13.66L14.3798 14.47C14.2798 14.6 14.1998 14.83 14.2098 14.99L14.2698 16.04C14.3098 16.69 13.8498 17.02 13.2498 16.78L12.2698 16.39C12.1198 16.33 11.8698 16.33 11.7198 16.39L10.7398 16.78C10.1398 17.02 9.67978 16.68 9.71978 16.04L9.77978 14.99C9.78978 14.83 9.70978 14.59 9.60978 14.47L8.93978 13.66C8.52978 13.16 8.69978 12.62 9.32978 12.46L10.3498 12.2C10.5098 12.16 10.7098 12.01 10.7898 11.88L11.3598 10.99C11.7198 10.45 12.2798 10.45 12.6298 10.99Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>                   
                    </Icon>
    
                    <p>Certificate included</p>
                </div>
            </div>

        </div>



        <h1 id="tag">Chemistry</h1>

    </article>



    <article id="objective">
        <h3>Objective</h3>
        <p>A transformative course designed to introduce high school students to the fundamental concepts and applications of collegiate-level chemistry. This course aims to demystify the principles of chemistry, showcasing how they underpin the world around us, from the smallest atoms to complex biological systems and environmental processes. Through a blend of theoretical knowledge and practical experiments, students will explore topics such as atomic structure, chemical bonding, thermodynamics, organic chemistry, and biochemistry. The objective is to foster a deep understanding and appreciation of chemistry, encouraging students to develop critical thinking and problem-solving skills that are essential for future scientific pursuits. </p>
    </article>


    <article id="lessons">
        <h3>Lessons</h3>

        <div class="grid">
            {#each Array(7) as _ }
                <Lessoncard />
            {/each }
        </div>
    </article>

    
</main>


<style lang="scss">

    @use "$lib/interface/variables" as app;

    main {

        padding-bottom: 5rem;

        div.chip {
            fill: transparent;
            stroke: app.$color-foreground;

            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.5rem;
        }

        > * {
            width: 100%;
            max-width: app.$max-width;
            margin: 0px auto;

        }


        article#showcase {


            position: relative;

            // border: 1px solid orange;
            margin-top: 3rem;
            padding-top: 4rem;
            padding-bottom: 2rem;

            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 52vh;
            gap: 1rem 5vw;

            > div {
                // border: 1px solid blue;
                flex-grow: 1;
            }

            // Information section
            > div:nth-child(1) {
                display: flex;
                justify-content: center;
                flex-direction: column;
                gap: 1.5rem;

                div.instructor {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 0.5rem;
                    max-height: 2rem;

                    img { width: 2rem; height: 2rem; border-radius: 1rem; }
                }

                h1 { font-family: app.$typeface-heading; font-weight: app.$weight-bold; }

                h6 {
                    position: relative;
                    text-transform: uppercase;
                    width: max-content;

                    color: #FF662B;


                    &::after {
                        display: none;

                        position: absolute;
                        top: 0px;
                        bottom: 0px;
                        right: -10%;
                        z-index: -1;

                        content: "";
                        height: 100%;
                        width: 50vw;
                        background-color: #FFD3C2;
                    }

                }
            }

            // Graphic section
            > div:nth-child(2) {
                display: flex;
                align-items: center;
                justify-content: center;

                padding: 1rem 0px;

                img {
                    position: relative;
                }
            }

            // Graphic section
            > div {

                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 2rem;

                div.nuggets {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-template-rows: max-content;


                    border: 1px solid app.$color-shade;
                    border-radius: 0.8rem;

                    width: 100%;
                    height: 3.5rem;
                    

                    > div {
                        display: flex;
                        flex-direction: column;
                        gap: 0px;

                        padding: 0.5rem 1rem;
                        
                        &:nth-child(1) { border-right: 1px solid app.$color-shade; }

                        h6 { text-transform: uppercase; color: app.$color-midground; font-size: 70%; line-height: 120%; }
                    }
                }

                div.info {
                    margin-left: 0.5rem;

                    display: flex;
                    flex-direction: column;
                    gap: 0.3rem;

                    svg { stroke: app.$color-midground; }

                    
                }
                
            }



            > h1#tag {
                display: none;

                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
                font-size: 12vw;
                font-family: app.$typeface-heading;
                font-weight: 700;
                color: app.$color-elevate;
                z-index: -5;

                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: app.$color-shade;
            }


        }

        article#objective {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            gap: 1rem;

            margin-top: 1rem;
            margin-bottom: 3rem;
        }

        article#lessons {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            div.grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 1rem;

                // padding: 0px 5vw;
            }
        }

        
    }
</style>


