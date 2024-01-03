import type { Timestamp } from "firebase/firestore";
import type { PageData } from "../../routes/$types";



export interface IEvent {
    organization: string;
    date: number;
    location: string;
    thumbnail: string;
    backgroundColor: string;
    description: string;
}

export enum ideaType {
    text,
    video
}


export interface courseLoadData extends PageData {
    courseID: string;
    objective: string;
    tag: string;
    title: string;
    lessons: lessonData[]
}

export interface lessonData extends PageData {
    id: string;
    courseID: string;
    title: string;
    subtitle: string;
    postDate: Timestamp;
    ideas: string[];
    quiz: QuizQuestion[];
}

export interface QuizQuestion {
    prompt: string;
    type: string;
    choices: string[];
    correct: number;
}




