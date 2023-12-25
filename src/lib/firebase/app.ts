


import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
export const auth = getAuth(app);




