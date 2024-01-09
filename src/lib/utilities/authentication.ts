import { writable } from "svelte/store";
import { doc, getDoc } from "firebase/firestore";
import { auth, database } from "$lib/firebase/app";
import type { Institution } from "$lib/models/app";
import { browser } from "$app/environment";
import type { User } from "firebase/auth";




export interface UserProfile {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    photoURL: string | null,
    role: "admin" | "teacher" | "student",
    courses: string[];

    request: Institution | undefined,
    institution: Institution | undefined;
}

const nullUser: UserProfile = {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    photoURL: "",
    role: "student",
    courses: [],
    request: undefined,
    institution: undefined
}

export const user = writable<UserProfile>(nullUser);

export async function updateUser(fresh: User | null) {

    if (fresh === null) {
        console.warn("User has logged out!");
        user.set(nullUser);
        if (browser) {
            document.cookie = `institution=;`;
            document.cookie = `user=;`;
            document.cookie = `role=;`;
            document.cookie = `sent=false;`;
        }

        return;
    }


    const profile = fresh!;
    const [first, last] = profile.displayName ? profile.displayName.split("^^") : ["", ""];

    const snap = await getDoc(doc(database, "users", profile.email!));
    const { role, institution, request, courses } = (snap.data() as any);

    let fetchCampus = undefined;
    let fetchRequest = undefined;


    if (institution != null) {
        const req = await getDoc(doc(database, "institution", institution));
        const data = req.data() as any;
        fetchCampus = { id: req.id, name: data.name, pfp: data.pfp }
    }

    if (request != null) {
        const req = await getDoc(doc(database, "institution", request));
        const data = req.data() as any;
        fetchRequest = { id: req.id, name: data.name, pfp: data.pfp }
    }

    if (browser) {
        document.cookie = `institution=${fetchCampus?.id ? fetchCampus.id : ""};`;
        document.cookie = `user=${profile.email};`;
        document.cookie = `role=${role};`;
    }; 


    user.set({
        id: profile.uid,
        email: profile.email!,
        firstName: first,
        lastName: last,
        photoURL: profile.photoURL,
        courses: courses,

        role: role,
        request: fetchRequest,
        institution: fetchCampus
    });
}

export function updateUserEmail(newEmail: string) {
    user.update((current) => {
        return {
            ... current,
            email: newEmail
        }
    })
}

