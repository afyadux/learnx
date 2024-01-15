


import { initializeApp } from "firebase/app";
import { getAuth, updateProfile, type User } from "firebase/auth";
import { doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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
export const database = getFirestore(app);
export const storage = getStorage(app);

export const uploadCourseCoverImage = async (file: File, institutionID: string, courseID: string,) => {
  const coverImageReference = ref(storage, `${ institutionID }/courses/${ courseID }`);
  await uploadBytes(coverImageReference, file);
  const url = await getDownloadURL(coverImageReference);

  await updateDoc(doc(database, "course", courseID), { cover: url });
}

export const uploadProfilePhoto = async (file: File, user: User | undefined, institutionID: string) => {
  const coverImageReference = (user) ? ref(storage, `/users/${ user.uid }`) : ref(storage, `/campus/${ institutionID }`);
  await uploadBytes(coverImageReference, file);
  const url = await getDownloadURL(coverImageReference);

  if (!user) {
    await updateDoc(doc(database, "institution", institutionID), { icon: url });
    return;
  }
  
  await updateProfile(user, { photoURL: url });


}





