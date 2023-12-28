

import { Timestamp, doc, getDoc } from "firebase/firestore";
import type { PageData, PageLoad } from "./$types";
import { database } from "$lib/firebase/app";

export const load:PageLoad = async ({ params }) => {

    const { lessonID } = params; 

    const pointer = await getDoc(doc(database, "lesson", lessonID));

    return {
        ... pointer.data(),
        lessonID: lessonID
    };
}

