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
}


export const user = writable<UserProfile | undefined>(undefined);

export async function updateUser(fresh: User | null) {

    if (fresh === null) {
        console.warn("User has logged out!");
        user.update(() => undefined);
        return;
    }

    const profile = fresh!;
    const [first, last] = profile.displayName ? profile.displayName.split("^^") : ["", ""];

    const snap = await getDoc(doc(database, "users", profile.email!));
    const { role } = (snap.data() as any);

    user.set({
        id: profile.uid,
        email: profile.email!,
        firstName: first,
        lastName: last,
        photoURL: profile.photoURL,

        role: role,
    });

}


