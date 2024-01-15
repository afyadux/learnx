import { writable } from "svelte/store";
import { doc, getDoc } from "firebase/firestore";
import { auth, database } from "$lib/firebase/app";
import type { Institution } from "$lib/models/app";
import { browser } from "$app/environment";
import type { User } from "firebase/auth";
import { wipeCookies } from "../utilities/cookies";
import { goto } from "$app/navigation";



export interface UserNotification {
    read: boolean, text: string, title: string
}

export interface UserProfile {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    photoURL: string | null,
    role: "admin" | "teacher" | "student",
    courses: string[],
    notifications: UserNotification[],

    request: Institution | undefined,
    institution: Institution | undefined
}

const nullUser: UserProfile = {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    photoURL: "",
    role: "student",
    courses: [],
    notifications: [],
    request: undefined,
    institution: undefined
}

// export class Cypher {


//     static encryptionKey = () => {
//         return Buffer.from("eebef23b4975a62d804ff4081ad0c873a8a8f4b3a2280ef7e4f2188ef65ed0cb", 'hex');
//     }
    

//     static splitEncryptedText( encryptedText: string ) {
//         return {
//             ivString: encryptedText.slice( 0, 32 ),
//             encryptedDataString: encryptedText.slice( 32 ),
//         }
//     }

//     static encrypt( plaintext: string) {

//         try {
//             const iv = crypto.randomBytes( 16 );
//             const cipher = crypto.createCipheriv( 'aes-256-cbc', Cypher.encryptionKey(), iv );

//             const encrypted = Buffer.concat( [
//                 cipher.update(
//                     plaintext, 'utf-8'
//                 ),
//                 cipher.final(),
//             ] );

//             return iv.toString( 'hex' ) + encrypted.toString( 'hex' );

//         } catch (e) {
//             console.error( e );
//         }
//     };

//     static decrypt( cipherText: string) {
//         const {
//             encryptedDataString,
//             ivString,
//         } = Cypher.splitEncryptedText( cipherText );

//         try {
//             const iv = Buffer.from( ivString, 'hex' );
//             const encryptedText = Buffer.from( encryptedDataString, 'hex');

//             const decipher = crypto.createDecipheriv( 'aes-256-cbc', Cypher.encryptionKey(), iv );

//             const decrypted = decipher.update( encryptedText );
//             return Buffer.concat( [ decrypted, decipher.final() ] ).toString();
//         } catch (e) {
//             console.error( e );
//         }
//     }
// }

export const user = writable<UserProfile>(nullUser);

export async function updateUser(fresh: User | null) {

    if (fresh === null) {
        console.warn("User has logged out!");
        user.set(nullUser);
        if (browser) {
            wipeCookies();

            document.cookie = `institution=;`;
            document.cookie = `user=;`;
            document.cookie = `role=;`;
        }

        return;
    }


    const profile = fresh!;
    const [first, last] = profile.displayName ? profile.displayName.split(" ") : ["", ""];

    const snap = await getDoc(doc(database, "users", profile.uid));
    const { role, institution, request, courses, notifications } = (snap.data() as any);

    let fetchCampus : any = undefined;
    let fetchRequest : any = undefined;


    if (institution != null) {
        const req = await getDoc(doc(database, "institution", institution));
        fetchCampus = { id: req.id, ...req.data() }
    }

    if (request != null) {
        const req = await getDoc(doc(database, "institution", request));
        fetchRequest = { id: req.id, ...req.data() }
    }

    if (browser) {
        document.cookie = `institution=${fetchCampus?.id ? fetchCampus.id : ""};`;
        document.cookie = `user=${profile.uid};`;
        document.cookie = `role=${role};`;
    }; 


    user.set({
        id: profile.uid,
        email: profile.email!,
        firstName: first,
        lastName: last,
        photoURL: profile.photoURL,
        courses: courses,
        notifications: notifications,

        role: role,
        request: fetchRequest,
        institution: fetchCampus
    });

    if (browser) {
        goto("/");
    }
}

export function updateUserEmail(newEmail: string) {
    user.update((current) => {
        return {
            ... current,
            email: newEmail
        }
    })
}

