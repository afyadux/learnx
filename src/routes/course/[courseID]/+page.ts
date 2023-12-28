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

export interface courseLoadData extends PageData {
    courseID: string;
    objective: string;
    tag: string;
    title: string;
    lessons: lessonData[]
}

export interface lessonData {
    index: number;
    title: string;
    subtitle: string;
    postDate: Date;
    ideas: string[];
    quiz: QuizQuestion[];
}

export interface QuizQuestion {
    question: string;
    type: string;
    choices: string[];
    correct: number;
}
