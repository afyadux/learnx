
<script lang="ts">
    import Icon from "./Icon.svelte";

    let error: string = "";

    export let value: string;
    export let type: "text" | "password" | "email" | "search" | "number" = "text";
    export let editable: boolean = true;
    export let placeholder: string = "";

    export let title: string = "";
    export let actionTitle: string = "";
    export let onActionClicked: () => void = () => {  }; 

    const onEditTextfield = () => {

    }

    const onFinishEdit = () => {
        console.log("Finished editing");

        // Email textfield validation
        if (type === "email") {

            const emailRegexPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (value === "" || value === undefined) { error = "Please enter a correct email address"; return; }
            if (emailRegexPattern.test(value) === false && value !== "") { error = "Please enter a correct email address"; return; }

            error = "";
        }

        // Email textfield validation
        if (type === "password") {

            if (value === "" || value === undefined) { error = "Please enter a password"; return; }
            if (value.length < 8) { error = "Password must be at least 8 charachters long"; return; }

            error = "";
        }
    }
    
</script>

<div class={ error ? "textfield error" : "textfield" }>
    <div class="header">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label id="title">{ title }</label>
        <button id="action" on:click={ onActionClicked }>{ actionTitle }</button>
    </div>

    <input
        {...{ type }}
        on:blur={ onFinishEdit }
        on:input={ onEditTextfield }
        style={ `padding: 0.6rem ${ ($$slots.action) ? 2.5 : 1 }rem 0.6rem ${ ($$slots.icon || $$slots.default) ? 2.5 : 1 }rem` }
        placeholder={ placeholder } readonly={ !editable } bind:value={ value }>

    <div class="marker">
        <slot name="icon"></slot>
        <slot></slot>         
    </div>

    <div class="action">
        <slot name="action"></slot>            
    </div>

    <label id="error" for="">{ error }</label>
</div>

<style lang="scss">

    @use "$lib/interface/variables" as app;

    div.textfield {
        position: relative;
        flex-grow: 1;
        width: 100%;
        height: max-content;

        margin-bottom: 0rem;

        display: flex;
        flex-direction: column;

        transition-property: margin-bottom;
        transition-timing-function: linear;
        transition-duration: 150ms;

        input {

            border-radius: 0.5rem; 
            border: 1px solid app.$color-shade;
            background-color: app.$color-elevate;

            width: 100%;
            height: max-content;

            &::placeholder {
                color: app.$color-midground; 
            }

            &:focus {
                border: 0.8px solid app.$color-info; 
                outline: none;
            }
        }

        
        label#error {
            opacity: 0%;

            position: absolute;
            bottom: -1.5rem;
            left: 0rem;
            right: 0px;

            color: app.$color-error;
            font-size: 0.8rem;
            margin: 0.1rem 0px;

            transition-property: opacity;
            transition-duration: 200ms;
            transition-timing-function: linear;
        }

        &.error {
            margin-bottom: 1.5rem;
        }

        &.error input {
            border: 1px solid app.$color-error;
        }

        &.error label#error {
            opacity: 100%;
        }


        div.marker, div.action {
            position: absolute;
            left: 0px;
            top: 1.5rem;
            bottom: 0px;


            fill: transparent;
            stroke: app.$color-tint;

            margin: 0.1rem 0.8rem 0px 0.8rem;

            > :global(button) {
                width: 1.3rem !important;
                height: 1.3rem !important;
            }
        }

        div.action {


            right: 0px;
            left: unset;

            display: flex;
            flex-direction: flex-end;
            align-items: center;
            gap: 0.5rem;
        }


        div.header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            label {
                font-size: 0.8rem;
                margin: 0.1rem 0px;
            }

            button {
                padding: 0px 0px;
                margin: 0px 0px;
                width: max-content;
                background-color: transparent;
                color: app.$color-info;
                font-size: 0.8rem;
                ;
            }
        }



        

    }
</style>

