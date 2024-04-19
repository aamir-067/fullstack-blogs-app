import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { app } from "./firebase.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createEmailAndPassUser = async ({ mail, password }) => {
    const auth = getAuth(app);
    try {
        const response = await createUserWithEmailAndPassword(auth, mail, password);
        const userDetails = response.user;
        console.log(userDetails);
        return userDetails;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const signInUserWithEmail = async ({ email, pass }) => {
    const auth = getAuth(app);
    try {
        const response = await signInWithEmailAndPassword(auth, email, pass);
        const userDetails = response.user;
        console.log(userDetails);
        return userDetails;
    } catch (error) {
        console.log(error?.massage);
        return null;
    }
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