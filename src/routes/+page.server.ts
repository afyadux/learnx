import { Timestamp, collection, doc, documentId, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import type { PageServerLoad } from "./$types";
import { database } from "$lib/firebase/app";
import type { CourseData, lessonData } from "$lib/models/app";


export const load: PageServerLoad = async ({ request }) => {

    try {

        let courses : CourseData[] = [];
        let lessons : lessonData[] = [];
        let institutional: CourseData[] = [];

        const cookieHeader = request.headers.get('cookie');
        const cookies: any = {};
        if (cookieHeader) {
            cookieHeader.split(';').forEach(cookie => {
            const [name, value] = cookie.split('=').map(c => c.trim());
            cookies[name] = value;
            });
        }

        const { institution, role, user } : { institution: string; role: string; user: string;  } = cookies;
        if (!institution || institution == "" || !user || user == "") {
            return {
                courses: courses,
                lessons: lessons,
                institutional: institutional
            }
        }

        const { courses : courseList } =  (await getDoc(doc(database, "users", user))).data() as { courses: string[] };

        if (courseList.length > 0) {
            const snapshots = query(collection(database, "course"), where(documentId(), "in", courseList));
            courses = (await getDocs(snapshots)).docs.map((item) => {

                return {
                    courseID: item.id, 
                    ...item.data()
                }
                
            }) as any; 
        }

        
        let lessonList : string[] = (courses.flatMap((c) => c.lessons)) as any;
        if (lessonList.length >  0) {
            const lessonSnapshots = query(collection(database, "lesson"), where(documentId(), "in", lessonList));
            lessons  = (await getDocs(lessonSnapshots)).docs.map((item) => {
                return {
                    id: item.id,
                    ... item.data(),
                    postDate: (item.data().postDate as Timestamp).toDate()
                }
            }) as any;
        }

    
        const institutionalCoursesList = query(collection(database, "course"), where('campus', "==", institution), limit(20));
        institutional = (await getDocs(institutionalCoursesList)).docs.map((doc) => {  return { courseID: doc.id, ...doc.data() }  }) as any; 

        return {
            courses: courses,
            lessons: lessons,
            institutional: institutional.filter((i) => (i !== null && i !== undefined))
        }

    } catch (error) { console.log(error); return {  } }


}


