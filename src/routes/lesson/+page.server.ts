import { Timestamp, collection, doc, documentId, getDoc, getDocs, query, where } from "firebase/firestore";
import type { PageServerLoad } from "./$types";
import { database } from "$lib/firebase/app";
import type { CourseData, lessonData } from "$lib/models/app";



export const load: PageServerLoad = async ({ request }) => {

    try {
        const cookieHeader = request.headers.get('cookie');
        const cookies: any = {};
        if (cookieHeader) {
            cookieHeader.split(';').forEach(cookie => {
            const [name, value] = cookie.split('=').map(c => c.trim());
            cookies[name] = value;
            });
        }

        if (!cookies.institution) { return { lessons: [] }}

        const { institution, role, user } : { institution: string; role: string; user: string;  } = cookies;

        const allCourses = query(collection(database, "course"), where('campus', "==", institution));
        const courses : CourseData[] = (await getDocs(allCourses)).docs.map((doc) => {  return { id: doc.id, ...doc.data() }  }) as any;
        const lessonIDs = courses.flatMap((course) => course.lessons) as any as string[];

        const lessonQuery = query(collection(database, "lesson"), where(documentId(), "in", lessonIDs))
        const fulfilledSnapshots = await getDocs(lessonQuery) as any;

        const lessons : lessonData[] = fulfilledSnapshots.docs.map((snap: any) => { 
            return {
                id: snap.id,
                ...snap.data(),
                postDate: (snap.data().postDate as Timestamp).toDate()
            }
        })

        return {
            lessons: lessons
        }

    } catch (error) { console.log(error); return { lessons: [] } }


}


