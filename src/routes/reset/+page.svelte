

<script lang="ts">
    import Icon from "$lib/interface/Icon.svelte";
    import Textfield from "$lib/interface/Textfield.svelte";
    import { ideaType } from "$lib/models/lesson";
    let passwordVisible = true;


  



    
</script>



<main>

    

            <section id="prompt">
        
                <div id="signup">

                    <h1 style="align-self:flex-start"> Reset Password  </h1>

                    <p style="align-self: flex-start; margin-top:12px; color:grey; margin-bottom:1rem;">Enter your new password twice below to reset your current password.</p>
                    
                    
                    <label for="user" style="margin-bottom: 6px;" >Enter new password</label>
                    <Textfield
                    placeholder="newpassword123">


                    </Textfield>

                   
                        <label for="password" style="margin-top: 1rem; margin-bottom: 6px;"> Confirm password</label> 
                       
                 
                    <Textfield placeholder="newpassword123">

                    </Textfield>
                    


                    <button id="signin">Reset Password</button>

                   


                    <p style="font-size: 14px; margin-top:1rem">Don't have an account? <a href="/" style="cursor: pointer;"> <labe for="" style="color: rgb(26,115,232);">Sign up</labe></a>  </p>
                </div>
                
            </section>

</main>



<style lang="scss">
    @use "$lib/interface/variables" as app;


    main {
        height: calc(100vh - 12rem);
        display: flex;
        justify-content: center;
        align-items: center;
        
    }

    #prompt {
        
        border: 1px solid app.$color-shade;
        height: 550px;
        width: 500px;
        margin: 1rem;
        
    }

    #signup {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2rem;

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
</style>

