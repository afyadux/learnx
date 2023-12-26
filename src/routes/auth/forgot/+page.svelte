
<script lang="ts">
    import Textfield from "$lib/interface/Textfield.svelte";

    let email: string = "";
    let emailError : string = "";

    $: formValid = 
        (email !== "") && (emailError === "") ;



</script>


<div id="forgot">

    <h1 style="align-self:flex-start"> Forgot Password?  </h1>

    <p style="align-self: flex-start; margin-top:12px; color:grey; margin-bottom:1rem;">Enter your email address to get the password reset email link.</p>
    
    <Textfield
        type="email"
        bind:error={ emailError }
        bind:value={ email } 
        title="Email Address"
        placeholder="name@institution.org"
    ></Textfield>


    <button disabled={ !formValid } on:click={ submitForm } id="cta">Reset Password</button>
    <p style="font-size: 14px; margin-top:1rem">Don't have an account? <a href="/" style="cursor: pointer;"> <labe for="" style="color: rgb(26,115,232);">Sign up</labe></a>  </p>
</div>


<style lang="scss">
    @use "$lib/interface/variables" as app;
</style>
