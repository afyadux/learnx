


// export const load: PageServerLoad = async ({ params }) => {

import { database } from "$lib/firebase/app";
import { getDoc, doc, Timestamp } from "firebase/firestore";
import type { PageServerLoad } from "./$types";
import { getCookies } from "$lib/utilities/cookies";


export const load: PageServerLoad = async ({ params, request }) => {

    const { lessonID } = params;
    const pointer = await getDoc(doc(database, "lesson", lessonID));
    const ps = (pointer.data()!.postDate as Timestamp).toDate();

    const cookies = getCookies(request);
    let assessment = undefined;

    if (cookies.user && cookies.role === "student") {

        const submission = await getDoc(doc(database, "lesson", lessonID, "submissions", cookies.user));
        if (submission.exists()) {
            const { answers, submitted: turnedIn } = submission.data()! as any;
            assessment = {
                submitted: turnedIn,
                answers: answers
            }
        }

    }


    return {
        ...pointer.data(),
        id: lessonID,
        postDate: ps,
        test: assessment
    };

}

