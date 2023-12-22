

<script lang="ts">



    
</script>


<a href="/lesson" class="card">

    <div id="header">
        <h3>The Ultimate Hitchikers Guide to the Galaxy</h3>
    </div>

    <div id="members">
        <img src="/icons/profile.png" alt=""> <img src="/icons/profile.png" alt=""> <img src="/icons/profile.png" alt="">
        <p> 23 members</p>

    </div>

    <div id="topic-icon">
            <img src={`/images/outsiders.jpeg` } alt="">
    </div>
    
    
</a>


<style lang="scss">
    .card  {
        display: flex;
        flex-direction: column;
        position: relative;
        border-radius: 1rem;
        overflow: hidden;
        background-color: rgba(193, 241, 255, 0.5);
        filter: drop-shadow(0rem 0rem 3rem rgba(40, 42, 54, 0.08));
        text-align: center;

        gap: 7vw 0px;
        cursor: pointer;

        flex-grow: 1;

    }


    #header {
   

        margin: 1rem 1rem 0px 1rem;
        display: inline-block;
        text-align: left;
        max-width: 95%;
        line-height: 1.2em;  
        max-height: 2.4em; 
        overflow: hidden;
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


        width: 8rem;
        height: 13.6rem;

        transform: translateX(24%) translateY(40%) rotateZ(-35deg);
        padding: 1.5rem;

        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
</style>

