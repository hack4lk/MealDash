// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8PcjdolqMGgG4ujaFe3srQlLOx8k5tP4",
    authDomain: "mealdash-eaacf.firebaseapp.com",
    projectId: "mealdash-eaacf",
    storageBucket: "mealdash-eaacf.firebasestorage.app",
    messagingSenderId: "933128644032",
    appId: "1:933128644032:web:0120a5cb9be8101a669425"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth }