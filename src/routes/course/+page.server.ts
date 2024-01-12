import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import type { PageServerLoad } from "./$types";
import { database } from "$lib/firebase/app";



export const load: PageServerLoad = async ({ request }) => {

    const cookieHeader = request.headers.get('cookie');
    const cookies: any = {};
    if (cookieHeader) {
        cookieHeader.split(';').forEach(cookie => {
        const [name, value] = cookie.split('=').map(c => c.trim());
        cookies[name] = value;
        });
    }

    if (!cookies.institution) { return { courses: [] }}

    const { institution, role, user } : { institution: string; role: string; user: string;  } = cookies;

    const allCourses = query(collection(database, "course"), where('campus', "==", institution));
    const courses = (await getDocs(allCourses)).docs.map((doc) => {  return { courseID: doc.id, ...doc.data() }  });

    return {
        courses: courses
    }
}

