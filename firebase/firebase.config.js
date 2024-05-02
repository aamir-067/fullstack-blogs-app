
import { initializeApp, } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDgGrlOHWpgZai_RjEo3AiGw8IDM-Xh1ks",
    authDomain: "blogs-app-b1036.firebaseapp.com",
    projectId: "blogs-app-b1036",
    storageBucket: "blogs-app-b1036.appspot.com",
    messagingSenderId: "354611676521",
    appId: "1:354611676521:web:bbeafa7675e39cf03ba9f8",
    measurementId: "G-4QCRM9Q6HF"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);