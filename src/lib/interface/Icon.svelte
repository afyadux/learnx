
<style lang="scss">
    .icon {

        padding: 0.1rem; 
        cursor: pointer;
        background-color: transparent;

        > :global(svg) {
            stroke: #1A1C1E;
        }

        &:disabled {
            cursor: not-allowed;
            pointer-events: none;

            > :global(svg) {
                stroke: #B3B5C3;
            }
        }

        &.fill {
            width: 100%; 
            height: 100%;
        }
    }
</style>

<script lang="ts">
    export let disabled : boolean = false;
    
    /** Function that should run when icon is clicked; <... handleClick={ () => { your function goes here } }> */
    export let handleClick : () => void = () => { };

    export let fill : boolean = false;
    export let frame: [number, number] = [1.5, 1.5];


</script>

<button style={ `width: ${ frame[0] }rem; height: ${ frame[1] }rem` } disabled={ disabled } on:click={ handleClick } class={ fill ? "icon fill" : "icon" }>
    <slot></slot>
</button>

