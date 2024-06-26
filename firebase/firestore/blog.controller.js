import { getDoc, doc, collection, query, where, getDocs } from "firebase/firestore";
import { app, db } from "../firebase.config";
import { unixTimestampToString } from "../../utils/unixToTime";
import { getUserById } from "./user.controllers";

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
    try {
        const col = collection(db, "UploadedBlogs");
        const q = query(col, where("blogId", "==", blogId));
        const querySnapshot = await getDocs(q);
        let result;
        querySnapshot.forEach(doc => {
            result = doc.data();
        })
        const uploadTime = unixTimestampToString(result?.time?.seconds);

        const user = await getUserById(result?.userId);

        return { name: user.name, uploadTime }

    } catch (error) {
        console.log("Error fetching blog details", error);
        throw new Error("Error Getting Owner of Blog")
    }
} 