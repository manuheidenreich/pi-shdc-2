import {initializeApp} from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB5a0Pb1meTzvvLIMcb7AWZSwkqLv7M6DE",
    authDomain: "pi-shdc-2.firebaseapp.com",
    projectId: "pi-shdc-2",
    storageBucket: "pi-shdc-2.firebasestorage.app",
    messagingSenderId: "1083898803271",
    appId: "1:1083898803271:web:a396515824b523fa242d62"
}

const app = initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = firebase.firestore();
