import { writable } from "svelte/store";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { database } from "$lib/firebase/app";
import type { Institution } from "$lib/models/app";
import { browser } from "$app/environment";




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
        if (browser) { document.cookie = ``; }
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
        document.cookie = `institution=${ fetchCampus?.id ? fetchCampus.id : "" }; user=${ profile.email }`;
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


