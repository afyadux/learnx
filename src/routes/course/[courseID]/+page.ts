import { doc, getDoc } from "firebase/firestore";
import type { PageData, PageLoad } from "./$types";
import { database } from "$lib/firebase/app";

export const load:PageLoad = async ({ params }) => {

    const { courseID } = params; 

    const snapshot = await getDoc(doc(database, "course", courseID));
    return {
        courseID: snapshot.id,
        ... snapshot.data()
    }
}


