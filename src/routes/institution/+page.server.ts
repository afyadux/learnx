import { getCookies } from "$lib/utilities/cookies";
import { collection, getDocs, limit, query } from "firebase/firestore";
import type { PageServerLoad } from "../$types";
import { database } from "$lib/firebase/app";
import type { Institution } from "$lib/models/app";



export const load: PageServerLoad = async ({ request }) => {

    const cookies = getCookies(request);

    let schools : Institution[] = [];

    if (!cookies.institution) {
        console.log('No institution');
        const schoolQuery = query(collection(database, "institution"), limit(20))
        schools = (await getDocs(schoolQuery)).docs.map((doc) => { 
            return {
                id: doc.id,
                ...doc.data()
            }
        }) as Institution[];
    }

    return {
        schools: schools
    }
}


