import { collection, setDoc, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config.js";


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
        const res = db.collection("Users").where("email", "==", email).get();
        if (res.empty) {
            return null;
        } else {
            console.log(res[0]);
            return res[0];
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}
