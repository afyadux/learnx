

<script lang="ts">
    import Icon from "$lib/interface/Icon.svelte";
    import Textfield from "$lib/interface/Textfield.svelte";
    import { ideaType } from "$lib/models/lesson";
    let passwordVisible = true;

    let selectedRole = '';

  function selectRole(role: string) {
    selectedRole = role;
  }


  



    
</script>



<main>

    <section id="prompt">

        <div id="signup">

            <h1 style="align-self:flex-start"> Register  </h1>

            <p style="align-self: flex-start; margin-top:12px; color:grey; margin-bottom:1rem;">Ready to learn? Start by selecting the account options below.</p>

            <div id="acctype">
                <label>
                    <input type="radio" bind:group={selectedRole} value="teacher">
                    <span >Teacher</span>
                  </label>
                  <label>
                    <input type="radio" bind:group={selectedRole} value="student">
                    <span >Student</span>
                  </label>
                  <label>
                    <input type="radio" bind:group={selectedRole} value="administrator">
                    <span >Administrator</span>
                  </label>
            </div>
            
            
            <label for="user" >Email</label>
            <!-- <input id="user" type="text" name="username" placeholder="Email or Phone Number"> -->
            <Textfield
            placeholder="hello@example.com">


            </Textfield>

            <div id="password">
                <label for="password"> Password</label> 
                <a href="./">Forgot Password?</a>
            </div>
            <Textfield placeholder="Enter password">

            </Textfield>
            


            <button id="signin">Register</button>

            <div id="other">
                <span class="border"> </span>
                <span id="text">Or register with</span>
                <span class="border"></span>

            </div>

            <button id="google">
                <img src="/icons/google.webp" alt="">
                Continue with Google
            </button>

            <button id="google">
                <img src="/icons/apple.svg" alt="">
                Continue with Apple
            </button>

            <p style="font-size: 14px; margin-top:1rem">Already have an Account?<a href="/" style="cursor: pointer;"> <labe for="" style="color: rgb(26,115,232); margin-left: 5px">Sign in</labe></a>  </p>
        </div>
        
    </section>

</main>



<style lang="scss">
    @use "$lib/interface/variables" as app;


    main {
        min-height: calc(100vh - 12rem);
        display: flex;
        justify-content: center;
        align-items: center;

        padding-top: 4rem;
        
    }

   
     

    #prompt {
        
        border: 1px solid app.$color-shade;
        height: max-content;
        width: 500px;
        margin: 1rem;
        
    }

    #signup {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2rem;

        div#acctype {

            display: flex;
            flex-direction: row;
            justify-content: space-between;
            background-color: #FAFAFC;
            border-radius: 0.8rem;
            padding: .4rem .4rem;
            width: 100%;
            

            label {
                display: block;
                padding: 10px;
                border-radius: 4px;
                margin-bottom: 5px;
                cursor: pointer;
                transition: background-color 0.3s, color 0.3s;

                    input[type="radio"] {
                        display: none;
                    }

                        input[type="radio"]:checked + span {
                            box-shadow: 0 0 1.5rem rgba(40, 42, 54, 0.0784313725);
                            color: #3361FF; 
                            font-weight: 400;
                            padding: .2rem .5rem;
                            border-radius: 3rem;
                        }

                                span {
                                    color: #69838C; 
                                }
}


           

        
        
             }

            }



    #signup label {
        align-self: flex-start;
        font-size: 17px;
    }

    
    
    #signin {
        margin-top: 1rem;
        width: 100%;
        border: .1rem;
    }

    #signin:hover {
        background-color: rgb(163, 23, 23);
        transition: all 240ms ease-in-out;
    }

    #password {
        margin-top: 1rem;
        margin-bottom: 5px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    #password a {
        font-size: 12px;
        color: rgb(26,115,232);
    }

   

    #google {
        width: 100%;
        margin-top: 15px;
        display: flex; 
        align-items: center; 
        justify-content: center; 
        padding: 5px 10px; 
        gap: 10px; 
        background-color: white;
        font-size: 16px;
        color: grey;
        border: 1px solid lightgrey;
        border-radius: .5rem;


    }

    #google:hover {
        background-color: lightgray;
        transition: 140ms all ease-in-out;
    }

    #google img {
        width: 2.5rem; 
        height: auto; 
    }

    #other {
        margin-top: 15px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
        gap: 1rem;
    }

    .border {
        position: relative;
        bottom: 12px;
        width: 35%;
        border-bottom: 1px solid lightgrey;
    }

    #text {
        color: grey;
        font-size: 12px;
    }

    

    
    
</style>

