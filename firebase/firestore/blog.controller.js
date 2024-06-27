import { getDoc, doc, collection, query, where, getDocs } from "firebase/firestore";
import { app, db } from "../firebase.config";
import { unixTimestampToString } from "../../utils/unixToTime";
import { getUserById } from "./user.controllers";
import { store } from "../../store/store";
import { setBlogs } from "../../features/blogsDetails.reducer";

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

        return { name: user.name, uploadTime, image: user.image || user.avatar } // ! fix this

    } catch (error) {
        console.log("Error fetching blog details", error);
        throw new Error("Error Getting Owner of Blog")
    }
}

export const getMainBlog = async () => {
    try {
        console.log("Starting getMainBlog");
        const col = collection(db, "Blogs");
        const q = query(col);
        const querySnapshot = await getDocs(q);
        let result = [];
        querySnapshot.forEach(doc => {
            result.push(doc.id);
        })
        const mainBlogIdIndex = Math.floor(result.length / 2);
        const mainBlogId = result[mainBlogIdIndex];
        console.log("Main Blog Id:", mainBlogId);

        // get the Blog and owner Results.
        const blog = await getBlog(mainBlogId);
        console.log("Got Blog:", blog);

        const blogOwner = await getOwnerOfBlog(mainBlogId);
        console.log("Got Blog Owner:", blogOwner);


        const prevResponse = store.getState().blogsDetails;
        store.dispatch(setBlogs({ ...prevResponse, topBlog: { details: blog, owner: blogOwner } }))
        return { blog, blogOwner }
    } catch (error) {
        console.log("Error in getMainBlog:", error);
        throw new Error("Error while getting the top Blog");
    }
}



export const getAllBlogs = async () => {
    try {

    } catch (error) {

    }
}
