


<script lang="ts">

    let courses = [];
</script>

<main>
    { #if courses.length === 0 }
        <div class="thumbnail"><img src="/images/empty/class.png" alt=""></div>

        <div class="message">
            <h4>You are not enrolled in any courses</h4>
            <a href="/join" class="button secondary">Join a course at your institution</a>
        </div>
    { :else }
        <p>Grid</p>
    {/if }
</main>


<style lang="scss">
    main {
        min-height: calc(100vh - 12rem);
        padding-top: 4rem;

        div.thumbnail {
            margin-top: 8vh;
            height: 15rem;

            display: flex;
            justify-content: center;
        }

        div.message {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 1rem;
        }
    }
</style>

