import { doc, getDoc } from "firebase/firestore";
import type { PageData, PageLoad } from "./$types";
import { database } from "$lib/firebase/app";

export const load:PageLoad = async (data) => {

    console.log(data);
    const { courseID } = data.params; 

    const snapshot = await getDoc(doc(database, "course", courseID));
    const IDs : string[] = (snapshot.data() as any).lessons;


    const fetchLessons = IDs.map((id) => getDoc(doc(database, "lesson",  id)));
    const fetch = (await Promise.all(fetchLessons)).map((snap) => snap.data()!);
    const lessons = fetch.map((item, index) => {

        return {
            ... item,
            id: IDs[index]
        };
    });

    return {
        courseID: snapshot.id,
        ... snapshot.data(),
        lessons: lessons
    }
}


