
<script lang="ts">
    import { user } from "$lib/functions/authentication";
    import type { UserNotification } from "$lib/functions/authentication";

    let notifications : UserNotification[] = $user.notifications;
    console.log(notifications)

</script>


<main id="notifications">
    <h1>Notifications</h1>

    <section class="notifs">
        { #if notifications.length === 0 }
                <div class="empty" style="margin: 0px auto;">
                    <div class="thumbnail"><img src="/images/empty/notification.png" alt=""></div>
                    <h3>You have no new notifications</h3>
                    <p style="text-align: center;">You can relax, take a break, and keep learning :)<p>
                </div>
        {/if }

        { #each notifications as notif }
            <div class="notif">
                <h4>{ notif.title }</h4>
                <p>{ notif.text }</p>
            </div>
        {/each }
    </section>
</main>


<style lang="scss">
    @use "$lib/interface/variables" as app;


    main#notifications {
        padding: 6rem 8vw 12rem 8vw;
        min-height: calc(100vh - 10rem);
    }

    section.notifs {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;

        div.empty {
            max-width: 840px;
            margin: 0px auto;
            gap: 0.5rem;

            img { margin-bottom: 1rem; }
        }

        div.notif {
            max-width: 840px;
            margin: 0px auto;
            padding: 1rem 1rem;
            border-radius: 1rem;
            border: 1px solid app.$color-shade;
        }
    }
</style>

