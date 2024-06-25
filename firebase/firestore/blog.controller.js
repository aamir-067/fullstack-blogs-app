import { getDoc, doc } from "firebase/firestore";
import { app, db } from "../firebase.config";

export const getBlog = async (uid) => {
    try {
        const docRef = doc(db, "Blogs", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (error) {
        console.log("Error fetching blog details", error);
    }
}


export const getOwnerOfBlog = async (blogId) => {

}