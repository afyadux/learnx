import { redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";


export const load: LayoutLoad = ({ route }) => {
    if (route.id === "/auth") { 

        throw redirect(302, "/auth/reset");
    }
}

