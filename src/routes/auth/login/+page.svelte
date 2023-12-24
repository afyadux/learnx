<script>
    import SocialAuth from "$lib/interface/SocialAuth.svelte";
    import Textfield from "$lib/interface/Textfield.svelte";

</script>


<div id="login">
    <h1 style="align-self:flex-start"> Sign in  </h1>
    <p style="align-self: flex-start; margin-top:12px; color:grey; margin-bottom:1rem;">Ready to learn? Welcome back to LearnX.</p>

    <label for="user" >login</label>
    <Textfield placeholder="hello@example.com"></Textfield>

    <div id="labels">
        <label for="password"> Password</label> 
        <a href="./">Forgot Password?</a>
    </div>
    <Textfield placeholder="Enter password"></Textfield>


    <button id="cta">Sign in</button>

    <div id="other">
        <span class="border"> </span>
        <span id="text">Or sign in with</span>
        <span class="border"></span>
    </div>

    <SocialAuth socialIcon={ "/icons/google.webp" } text={ "Continue with Google" } />
    <SocialAuth socialIcon={ "/icons/apple.svg" } text={ "Continue with Apple" } />

    <p style="font-size: 14px; margin-top:1rem">Don't have an account? <a style="color: rgb(26,115,232); cursor: pointer;" href="/signup">Sign up</a></p>

    <style lang="scss">

    </style>
</div>

<style lang="scss">
    
</style>


