



<script lang="ts">
    import Icon from "$lib/interface/Icon.svelte";
    export let approvals: boolean = false;

    export let user : undefined | {
        email: string;
        name: string;
        pfp: string;
    } = undefined;

    export let onApprove: () => void = () => {};
    export let onDeny: () => void = () => {};
</script>


<div class="user">
    <div class="image"><img src={ (user === undefined || user?.pfp === null) ? "/icons/nopfp.png" : user.pfp } alt=""></div>
    <div class="name">
        <h6>{ user ? user.name : "" }</h6>
        <p>{ user ? user.email : "" }</p>
    </div>

    <div class="approvals" style={ `${ approvals ? "display: flex" : "display: none" }` }>
        <Icon id="tick" handleClick={ onApprove }>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 7L9.42857 17L6 13"stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
        </Icon>

        <Icon id="ex" handleClick={ onDeny }>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.3033 16.9099L16.9099 6.30327M6.3033 6.30327L16.9099 16.9099" stroke="#363853" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
        </Icon>
    </div>
</div>

<style lang="scss">
    @use "$lib/interface/variables" as app;

    div.user {
        position: relative;

        border: 1px solid app.$color-shade;
        padding: 0.7rem 0.8rem;
        border-radius: 1rem;
        height: max-content;

        display: grid;
        gap: 0px 1rem;
        grid-template-columns: 3rem auto;
        grid-template-rows: 3rem;
    }

    div.image {
        border-radius: 4rem;
        border: 1px solid app.$color-shade;
    }

    div.name {
        padding-right: 2rem;
    }

    div.approvals {
        position: absolute;
        bottom: 0rem;
        top: 0px;
        right: 0.5rem;

        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.3rem;

        fill: transparent;


        > :global(button svg) { stroke: app.$color-midground; }
        > :global(button#tick svg:hover) { stroke: app.$color-success; }
        > :global(button#ex svg:hover) { stroke: app.$color-error; }
    }

</style>

