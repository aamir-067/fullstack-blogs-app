import {
    getAuth,
    signOut,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { router } from 'expo-router';
import { getJson, storeJson, getString, storeString } from "../utils/asyncStorage.js";
import { app } from "./firebase.config";
import { addUser, getUserById } from "./firestore/user.controllers.js";
import { store } from "../store/store";
import { resetUserDetails, setUserDetails } from "../features/userDetails.reducer";

export const createEmailAndPassUser = async ({ name, email, password }) => {
    const auth = getAuth(app);
    [name, email, password].forEach((value) => {
        if (!value) {
            throw new Error("All fields are required");
        }
    });
    try {
        const dummyPic = "https://firebasestorage.googleapis.com/v0/b/blogs-app-b1036.appspot.com/o/dummyProfile.jpg?alt=media&token=f3f99335-d374-43e6-8fc8-1df80016a50c";
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const userDetails = response.user;
        const details = await addUser(userDetails.uid, { name, email, password, image: dummyPic });
        await signInUserWithEmail({ email, pass: password });
    } catch (error) {
        console.log(error);
        return "Error While SignIn";
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
    if (user) {
        const details = await getUserById(user.uid);
        await storeString("userDetails", details.email);


        console.log("Login details ====> ", details);
        const userDetails = {
            id: user?.uid,
            name: details?.name,
            email: details.email,
            avatar: details?.image,
        }
        store.dispatch(setUserDetails(userDetails));

    }
    router.navigate("/profile");
}

export const signOutUser = async () => {
    const auth = getAuth(app);
    // make sure that user is logged in.
    const userEmail = await getString("userDetails");
    if (userEmail) {
        const res = await signOut(auth);
        await storeString("userDetails", "");
        store.dispatch(resetUserDetails());
        router.navigate("/");
        return true;
    }
    // console.log("failed logout");
    return null;
}

export const signInWithGoogle = async () => {
    const auth = getAuth(app);
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