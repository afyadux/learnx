import { writable } from "svelte/store";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { database } from "$lib/firebase/app";
import type { Institution } from "$lib/models/app";




interface UserProfile {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    photoURL: string | null,
    role: string,

    request: Institution | undefined,
    institution: Institution | undefined;
}

const nullUser = {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    photoURL: "",
    role: "",
    request: undefined,
    institution: undefined
}

export const user = writable<UserProfile>(nullUser);

export async function updateUser(fresh: User | null) {

    if (fresh === null) {
        console.warn("User has logged out!");
        user.set(nullUser);
        return;
    }

    const profile = fresh!;
    const [first, last] = profile.displayName ? profile.displayName.split("^^") : ["", ""];

    const snap = await getDoc(doc(database, "users", profile.email!));
    const { role, institution, request } = (snap.data() as any);

    let fetchCampus = undefined;
    let fetchRequest = undefined;

    if (institution) {
        const req = await getDoc(doc(database, "institution", institution));
        const data = req.data() as any;
        fetchCampus = { id: req.id, name: data.name, pfp: data.pfp }
    }

    if (request) {
        const req = await getDoc(doc(database, "institution", institution));
        const data = req.data() as any;
        fetchRequest = { id: req.id, name: data.name, pfp: data.pfp }
    }

    user.set({
        id: profile.uid,
        email: profile.email!,
        firstName: first,
        lastName: last,
        photoURL: profile.photoURL,

        request: fetchRequest,
        role: role,
        institution: fetchCampus
    });

}


