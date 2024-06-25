import { collection, setDoc, getDoc, doc, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase.config.js";
import { getJson, getString } from "../../utils/asyncStorage.js";
import { getBlog } from "./blog.controller.js";
import { setUserDetails as setUsersDetails } from "../../features/userDetails.reducer";
import { store } from "../../store/store";
import { setBlogs } from "../../features/blogsDetails.reducer";
export const addUser = async (uid, { name, email, password, image }) => {
    try {
        const res = await setDoc(doc(db, "Users", uid), {
            name, email, password, image
        });
        return { uid, name, email, password, image };
    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }
}
export const getUserById = async (userId) => {
    try {
        const docSnap = await getDoc(doc(db, "Users", userId));

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            return null;
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export const getUserByEmail = async (email) => {
    try {
        const q = query(collection(db, "Users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        let myUser;
        querySnapshot.forEach((doc) => {
            if (doc.data().email === email) {
                myUser = { uid: doc.id, ...doc.data() }
            }
        });
        const userDetails = {
            id: myUser?.uid,
            name: myUser?.name,
            email: myUser.email,
            avatar: myUser?.image,
        }
        store.dispatch(setUsersDetails(userDetails));
        return userDetails;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const uploadBlog = async ({ title, readingTime, content, image }) => {
    try {
        [title, readingTime, content, image].forEach((value) => {
            if (!value) {
                throw new Error("All fields are required");
            }
        });

    } catch (error) {
        console.log(error);
        return null;
    }
}


export const getUserUploadedBlogs = async (email = "") => {
    // get the userDetails from localStorage.
    // search for userDetails by email.
    // get the uid.
    // get the uploaded blogs uid array.
    // get the blogs from firestore.
    // return it.
    try {
        console.log("getUserUploadedBlogs started", email);
        const userDetailsFromDb = await getUserByEmail(email);
        console.log("User details from db:", userDetailsFromDb);
        const uid = userDetailsFromDb?.id ? userDetailsFromDb?.id : null;
        if (!uid) {
            throw new Error("User not found");
        }
        const q = query(collection(db, "UploadedBlogs"), where("userId", "==", uid));
        const querySnapshot = await getDocs(q);
        let uploadedBlogsIds = [];
        querySnapshot.forEach((doc) => {
            uploadedBlogsIds.push(doc.data()?.blogId);
        });
        console.log("Uploaded blogs ids:", uploadedBlogsIds);

        let blogsLength = uploadedBlogsIds.length;
        let blogsDetails = [];
        for (let i = 0; i < blogsLength; i++) {
            const blogDetail = await getBlog(uploadedBlogsIds[i]);
            blogsDetails.push(blogDetail);
        }

        const prevDetails = store.getState().blogsDetails;
        store.dispatch(setBlogs({ ...prevDetails, userBlogs: { details: blogsDetails, ids: uploadedBlogsIds } }));
        console.log("Blogs details:", blogsDetails);

        return [blogsDetails, uploadedBlogsIds];

    } catch (error) {
        console.log("Error in getUserUploadedBlogs:", error);
    }
}
