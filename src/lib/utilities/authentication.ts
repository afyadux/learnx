import { writable } from "svelte/store";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { database } from "$lib/firebase/app";




interface UserProfile {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    photoURL: string | null,
    role: string,

    institution: {
        name: string,
        pfp: string
    } | undefined;
}

const nullUser = {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    photoURL: "",
    role: "",
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
    const { role, institution } = (snap.data() as any);

    let fetchCampus = undefined;

    if (institution) {
        const data = (await getDoc(doc(database, "institution", institution))).data() as any;
        fetchCampus = { name: data.name, pfp: data.pfp }
    }

    user.set({
        id: profile.uid,
        email: profile.email!,
        firstName: first,
        lastName: last,
        photoURL: profile.photoURL,

        role: role,
        institution: fetchCampus
    });

}


