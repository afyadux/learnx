import { database } from "$lib/firebase/app";
import { getDoc, doc, Timestamp } from "firebase/firestore";
import type { PageLoad } from "./$types";
import type { RequestEvent } from "../$types";


export const load: PageLoad = async ({ params }) => {

    const { lessonID } = params;
    const pointer = await getDoc(doc(database, "lesson", lessonID));


    return {
        id: lessonID,
        ... pointer.data(),
    };

}


