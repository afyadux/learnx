import { doc, getDoc } from "firebase/firestore";
import type { PageServerLoad } from "./$types";
import { database } from "$lib/firebase/app";
import { getCookies } from "$lib/utilities/cookies";

export const load:PageServerLoad = async ({ request }) => {

    const cookies = getCookies(request);
    

    return {
        
    }
}


