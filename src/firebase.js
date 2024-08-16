 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";
 import { getAuth } from "firebase/auth";
 import { getFirestore } from "firebase/firestore";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 // Your web app's Firebase configuration
 const firebaseConfig = {
   //  deepcode ignore HardcodedNonCryptoSecret: Firebase
    apiKey: "AIzaSyBWl5BnmfmW3FFKgpirp_Et6qIMcNyZ3z4",
    authDomain: "stichting-spe.firebaseapp.com",
    projectId: "stichting-spe",
    storageBucket: "stichting-spe.appspot.com",
    messagingSenderId: "100337021195",
    appId: "1:100337021195:web:09bd82b528fdc26cc0720e"
 };
 // Initialize Firebase

 const app = initializeApp(firebaseConfig);
 // Export firestore database
 // It will be imported into your react app whenever it is needed
 export const db = getFirestore(app);
 export const auth = getAuth(app);