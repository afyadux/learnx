

<script lang="ts">
    import SocialAuth from "$lib/interface/SocialAuth.svelte";
    import Tabbar from "$lib/interface/Tabbar.svelte";
    import Textfield from "$lib/interface/Textfield.svelte";

    let role: string = "";
    
</script>


<div id="signup">

    <h1 style="align-self:flex-start"> Register  </h1>
    <p style="align-self: flex-start; margin-top:12px; color:grey; margin-bottom:1rem;">Ready to learn? Start by selecting the account options below.</p>
    
    <Tabbar fill options={["student", "teacher", "admin"]} bindingGroup={ role }/>
    <br>

    <label for="user" >Email</label>
    <Textfield placeholder="hello@example.com"></Textfield>

    <div id="labels">
        <label for="password"> Password</label> 
        <a href="./">Forgot Password?</a>
    </div>
    <Textfield placeholder="Enter password"></Textfield>
    


    <button id="cta">Register</button>

    <div id="other">
        <span class="border"> </span>
        <span id="text">Or register with</span>
        <span class="border"></span>

    </div>

    <SocialAuth socialIcon={ "/icons/google.webp" } text={ "Continue with Google" } />
    <SocialAuth socialIcon={ "/icons/apple.svg" } text={ "Continue with Apple" } />

    <p style="font-size: 14px; margin-top:1rem">Already have an Account?<a href="/" style="cursor: pointer;"> <labe for="" style="color: rgb(26,115,232); margin-left: 5px">Sign in</labe></a>  </p>
</div>


<style lang="scss">
    @use "$lib/interface/variables" as app;
</style>

