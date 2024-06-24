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
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const userDetails = response.user;
        const details = await addUser(userDetails.uid, { name, email, password, image: "" });
        // await storeJson("userDetails", details);
        router.navigate("/");
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
        await storeString("userDetails", null);
        router.navigate("/");
        store.dispatch(resetUserDetails());
        console.log("Logout Done === ======= =======> ");
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