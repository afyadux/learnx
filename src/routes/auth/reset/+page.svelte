
<script lang="ts">
    import Textfield from "$lib/interface/Textfield.svelte";


</script>


<div id="reset">

    <h1 style="align-self:flex-start"> Reset Password  </h1>

    <p style="align-self: flex-start; margin-top:12px; color:grey; margin-bottom:1rem;">Enter your new password twice below to reset your current password.</p>
    
    
    <label for="user" style="margin-bottom: 6px;" >Enter new password</label>
    <Textfield placeholder="newpassword123"></Textfield>

    <label for="password" style="margin-top: 1rem; margin-bottom: 6px;"> Confirm password</label> 
    <Textfield placeholder="newpassword123"></Textfield>
    
    <button id="cta">Reset Password</button>


    <p style="font-size: 14px; margin-top:1rem">Don't have an account? <a href="/" style="cursor: pointer;"> <labe for="" style="color: rgb(26,115,232);">Sign up</labe></a>  </p>
</div>


<style lang="scss">
    @use "$lib/interface/variables" as app;
</style>
