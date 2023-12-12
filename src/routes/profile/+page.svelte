<script>

import Icon from "$lib/interface/Icon.svelte";

let passwordVisible = false;

let email = "jpmetoyer@gmail.com";

async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(email);
      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }



</script>




<section id="profile">


</section>

<section id="account">
    <h2>Account </h2>


    <div id="info">
        <div id="email">
            <label for="email"> Email:</label>

            <input type="text" bind:value={email} readonly> 
            <button on:click={copyToClipboard} >
                 <img src="/icons/copy.svg" alt=" ">           
            </button>
            
        </div>

       <div id="password">
        <label for="password"> Password:</label>
        <input type={ passwordVisible ? "text" : "password" } name="" id="" value="password123">
        <Icon handleClick={ () => { passwordVisible = !passwordVisible } }> 
        { #if passwordVisible }
            <img src="/icons/hiddeneye.svg" alt="">
        { :else }
            <img src="/icons/visibleye.svg" alt="">
        {/if }

        </Icon>
       </div>

      

       
          
    </div>
    
    <div id="logout">
        <button class="secondary">
            Sign out
        </button>
    </div>
</section>



<style>
    #profile {
        border-bottom: 2px dashed grey;
        width: 80%;
        margin: 0 auto;
        
    }

    #account {
        
        width: 80%;
        margin: 0 auto;
        margin-top: 15px;

    }

    #email {
        background-color: #ededed;
        width: max-content;
        height: auto;
        border-radius: 10px;
        padding-left: 1rem;
        padding-bottom: .7rem;
        padding-right: 9rem;
        padding-top: .3rem;
        justify-self: center;
        
    }
    #email button {
        padding: 0;
        margin: 0;
        width: max-content;
        height: auto;
        background: none;
        position: relative;
        left: 8rem;
        top: 7px;
        
    }

  
    #email button img {
        width: 1.5rem;
        height: 1.5rem;
    }

   

    #info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        margin-top: 8px;
    }

    @media screen and (max-width:1110px) {
        #info {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr;
            gap: 2rem;
            margin-top: 8px;
            justify-content: center;
        }


    }

    #info input {
        color: grey;
        background-color: #ededed;

    }

    #password img {
        position: relative;
        top: 8px;
        left: 6rem;
    }

   #password {
        background-color: #ededed;
        width: max-content;
        height: auto;
        border-radius: 10px;
        padding-left: 1rem;
        padding-bottom: .3rem;
        padding-right: 7rem;
        padding-top: .3rem;
        justify-self: center;
   }

   @media screen and (max-width:970px) {
        #password {
           
            padding-bottom: .8rem;
            
        }
    }

    #logout {
        margin: 1rem;
        display: flex;
        justify-content: center;
    }


   
</style>