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


export interface CourseData {
    courseID: string;
    objective: string;
    tag: string;
    title: string;
    lessons: lessonData[],
    students: string[],
    instructor: {
        name: string;
        email: string,
        pfp: string | null;
    }
}

export interface lessonData {
    id: string;
    courseID: string;
    title: string;
    subtitle: string;
    postDate: Date;
    ideas: LessonIdea[];
    quiz: QuizQuestion[];
    quizPublished: boolean;
    instructor: {
        name: string;
        email: string,
        pfp: string | null;
    }
} 

export interface StudentTest {
    submitted: boolean; answers: number[]
}

export interface LessonIdea {
    type: "text" | "video",
    value: string; 
}

export interface QuizQuestion {
    prompt: string;
    type: string;
    choices: string[];
    correct: number;
}


export interface MiniInstitution {
    id: string;
    pfp: string;
    name: string;
}

export interface Institution extends MiniInstitution {
    
    admin: string;
    instructors: number;
    students: number;
    tutorials: number; 
    courses: string[];
}

export interface InstitutionRequest {
    type: "teacher" | "student";
    email: string;

}




