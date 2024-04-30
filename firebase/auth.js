import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { storeJson } from "../utils/asyncStorage.js";
import { app } from "./firebase.config";
import { addUser, getUserById } from "./firestore/user.controllers.js";

export const createEmailAndPassUser = async ({ name, email, password }) => {
    const auth = getAuth(app);
    [name, email, password].forEach((value) => {
        if (!value) {
            throw new Error("All fields are required");
        }
    });
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const userDetails = response.user;
        console.log(userDetails);
        const details = await addUser(userDetails.uid, { name, email, password, image: "" });
        await storeJson("userDetails", details);
        return details;
    } catch (error) {
        console.log(error);
        return null;
    }
}


export const signInUserWithEmail = async ({ email, pass }) => {

    [email, pass].forEach((value) => {
        if (!value) {
            throw new Error("All fields are required");
        }
    })

    const auth = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(auth, email, pass)
    const user = userCredential.user;
    //console.log(user);
    if (user) {
        const details = await getUserById(user.uid);
        await storeJson("userDetails", details);
        console.log(details);
    }
    // const userId = await addUser({ name, email, password, image: "" });
    return null;
}

export const signInWithGoogle = async () => {
    const auth = getAuth(app);
    console.log("trigger");
    const provider = new GoogleAuthProvider(app);

    try {
        const response = await signInWithPopup(auth, provider);
        console.log(response.user);
        return response.user;
    } catch (error) {
        console.log(error);
        return null;
    }
}