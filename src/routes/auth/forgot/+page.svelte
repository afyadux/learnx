
<script lang="ts">
    import Textfield from "$lib/interface/Textfield.svelte";


</script>


<div id="forgot">

    <h1 style="align-self:flex-start"> Forgot Password?  </h1>

    <p style="align-self: flex-start; margin-top:12px; color:grey; margin-bottom:1rem;">Enter your email address to get the password reset email link.</p>
    
    <label for="password" style="margin-top: 1rem; margin-bottom: 6px;"> Email Address</label> 
    <Textfield placeholder="hello@example.com"></Textfield>


    <button id="cta">Password Reset</button>
    <p style="font-size: 14px; margin-top:1rem">Don't have an account? <a href="/" style="cursor: pointer;"> <labe for="" style="color: rgb(26,115,232);">Sign up</labe></a>  </p>
</div>


<style lang="scss">
    @use "$lib/interface/variables" as app;
</style>
