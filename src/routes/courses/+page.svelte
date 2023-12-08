



<main>

    <div id="grid">
        {#each Array(20) as _ }
        <div class="card">

            <div id="header">
                <h3>The Ultimate Hitchikers Guide to the Galaxy</h3>
            </div>

            <div id="members">
                <img src="/icons/profile.png" alt=""> <img src="/icons/profile.png" alt=""> <img src="/icons/profile.png" alt="">
                <p> 23 members</p>

            </div>

            <img src="/icons/htmlicon.png" id="htmlicon" alt="">
            
        </div>

        
        {/each }
    </div>


</main>

<style lang="scss">

#grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;

}

.card  {
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    background-color: rgb(193, 241, 255);
    filter: drop-shadow(0rem 0rem 3rem rgba(40, 42, 54, 0.08));
    text-align: center;
}


#header {
    margin-left: 10px;
    margin-top: 10px;
    display: inline-block;
    text-align: left;
    max-width: 95%;
    line-height: 1.2em;  
    max-height: 2.4em; 
    overflow: hidden;
}

#members {
    margin-top: 2.8rem;
    margin-bottom: .5rem;
    margin-left: .5rem;
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
    
    border: 3px solid white;
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

    #htmlicon {
        position: absolute;
        border: 2px solid red;  
        left: 17.2rem; 
        top: 4rem;
        width: 3.8rem;
        height: 3.8rem;
        transform: rotate(-35deg);   
          
    }
    

   

  
</style>