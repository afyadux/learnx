import { redirect } from '@sveltejs/kit';
import type { Handle, RequestEvent } from '@sveltejs/kit';

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";


export const handle: Handle = async ({ event, resolve }) => {
    
    console.log("Request reached server");

    const appConfiguration = {
        apiKey: "AIzaSyCTxvy7suzgGYr16yQKDrSFazN5fBariN8",
        authDomain: "learnxcms.firebaseapp.com",
        projectId: "learnxcms",
        storageBucket: "learnxcms.appspot.com",
        messagingSenderId: "431067549249",
        appId: "1:431067549249:web:31c4cee923949d710180c0",
        measurementId: "G-XJYVGNCVQ8"
    }

    const app = initializeApp(appConfiguration);
    const auth = getAuth(app);


    if (event.url.pathname.startsWith("/auth") === false && !auth.currentUser) {
        return new Response(null, {
            status: 302,
            headers: {
                location: (event.url + "auth/register")
            }
        });
    }

    return resolve(event); 
};
