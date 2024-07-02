import { getDoc, doc, collection, query, where, getDocs, addDoc, Timestamp, setDoc } from "firebase/firestore";
import { app, db } from "../firebase.config";
import { unixTimestampToString } from "../../utils/unixToTime";
import { getUserById } from "./user.controllers";
import { store } from "../../store/store";
import { setBlogs } from "../../features/blogsDetails.reducer";
import { uploadFile } from "../storage/storage";

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

        return { name: user.name, uploadTime, image: user.image, email: user.email }

    } catch (error) {
        console.log("Error fetching blog details", error);
        throw new Error("Error Getting Owner of Blog")
    }
}

export const getMainBlog = async () => {
    try {
        const col = collection(db, "Blogs");
        const q = query(col);
        const querySnapshot = await getDocs(q);
        let result = [];
        querySnapshot.forEach(doc => {
            result.push(doc.id);
        })

        const mainBlogIdIndex = Math.floor((Math.random() * result.length));
        // const mainBlogIdIndex = Math.floor(result.length / 2);
        const mainBlogId = result[mainBlogIdIndex];

        // get the Blog and owner Results.
        const blog = await getBlog(mainBlogId);

        const blogOwner = await getOwnerOfBlog(mainBlogId);


        const prevResponse = store.getState().blogsDetails;
        store.dispatch(setBlogs({ ...prevResponse, topBlog: { details: { ...blog, id: mainBlogId }, owner: blogOwner } }))
        return { blog, blogOwner }
    } catch (error) {
        console.log("Error in getMainBlog:", error);
        throw new Error("Error while getting the top Blog");
    }
}

export const getAllBlogs = async () => {
    try {
        const col = collection(db, "UploadedBlogs");
        const q = query(col);
        const querySnapshot = await getDocs(q);
        let result = [];
        querySnapshot.forEach(doc => {
            result.push(doc.data().blogId);
        })
        let blogDetails = [];
        for (let blogId of result) {
            const blog = await getBlog(blogId);
            blogDetails.push(blog);
        }

        const prev = store.getState().blogsDetails;
        store.dispatch(setBlogs({ ...prev, allBlogs: { details: blogDetails, ids: result } }))
    } catch (error) {
        console.log("Error in getAllBlogs:", error);
        throw new Error("Error in getting All Blogs")
    }
}


export const uploadBlog = async ({ title, time, content, image }) => {
    try {
        // upload the image.
        const coverUrl = await uploadFile(image);

        if (!coverUrl) {
            throw new Error("Error Uploading Image");
        }

        // upload the blog.
        const res = await addDoc(collection(db, "Blogs"), {
            title, time, content, image: coverUrl
        });

        // Add the blog to the UploadedBlogs collection.
        const res2 = await addDoc(collection(db, "UploadedBlogs"), {
            blogId: res.id,
            userId: store.getState().userDetails.id,
            time: Timestamp.now()
        });
        return true;

    } catch (error) {
        console.log("Error while blog uploading ==>", error);
        throw new Error("ERROR in uploading the Blog");
    }
}



// TODO: fix this 
// ! ERROR: fix this 
export const updateBlog = async ({ title, time, content, blogId, image = undefined, prevImageUrl }) => {
    try {
        let coverUrl;
        if (image) {
            coverUrl = await uploadFile(image);
        } else {
            coverUrl = prevImageUrl;
        }


        if (!coverUrl) {
            throw new Error("Error Uploading Image");
        }

        // upload the blog.
        await setDoc(doc(db, "Blogs", blogId), {
            title, time, content, image: coverUrl
        });

        return true;
    } catch (error) {
        throw new Error("Something went wrong in updating the blog details.")
    }
}
