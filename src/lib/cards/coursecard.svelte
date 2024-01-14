

<script lang="ts">
    import type { CourseData } from "$lib/models/app";

    export let course: CourseData;
</script>


<a href="/course/{ course.courseID }" class="course card">

    <div id="header">
        <h3>{ course.title }</h3>
    </div>

    <div id="members">
        <img src="/icons/anonymous.png" alt=""> <img src="/icons/anonymous.png" alt=""> <img src="/icons/anonymous.png" alt="">
        <p>&middot; { course.students.length } students</p>
    </div>

    <div id="topic-icon">
        <img src={ course.cover ? course.cover : `/images/empty/book.png` } alt="">
    </div>
</a>


<style lang="scss">
    @use "$lib/interface/variables" as app;

    .card  {
        display: flex;
        flex-direction: column;
        position: relative;
        border-radius: 1rem;
        overflow: hidden;
        background-color: rgba(193, 241, 255, 0.5);
        filter: drop-shadow(0rem 0rem 3rem rgba(40, 42, 54, 0.08));
        text-align: center;

        gap: 2rem 0px;
        cursor: pointer;

        flex-grow: 1;

    }


    #header {
        display: flex;
        flex-direction: column; 
        align-items: flex-start;
        justify-content: flex-start;
        height: max-content;

        padding: 1rem 1rem;

        h3 {
            text-align: start;
            line-height: 150%;
            font-weight: app.$weight-semibold;
            height: 3.5rem;

            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2; /* number of lines to show */
                    line-clamp: 2; 
            -webkit-box-orient: vertical;
        }
    }

    #members {

        margin: 0px 1rem 1rem 1rem;
        display: flex;
        align-items: center; 
        position: relative;                
    }

    #members p {
        margin-left: 10px;
    }

    #members img {
        position: relative; 
        width: 1.5rem; 
        height: 1.5rem; 
        z-index: 1; 
        
        background-color: white;
        border: 3px solid rgb(193, 241, 255);
        border-radius: 3rem;

        &:not(:first-child) {
            margin-left: -6px; 
        }

        &:nth-child(1) {
            z-index: 3; 
        }
        &:nth-child(2) {
            z-index: 2; 
        }
        &:nth-child(3) {
            z-index: 1; 
        }

    }

    #topic-icon {
        position: absolute;
        bottom: 0px;
        right: 0px;

        border-radius: 0.5rem;


        width: 40%;
        height: max-content;

        transform: translateX(24%) translateY(40%) rotateZ(-30deg);
        padding: 1.5rem;

        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
</style>

