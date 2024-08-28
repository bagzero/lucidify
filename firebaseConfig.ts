// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMxs-SQ1z4L1HI_kqxDbUzXfWsUs6gHGc",
  authDomain: "lucidify-44c9b.firebaseapp.com",
  projectId: "lucidify-44c9b",
  storageBucket: "lucidify-44c9b.appspot.com",
  messagingSenderId: "167880290218",
  appId: "1:167880290218:web:68a2c6b5758901241785d3",
  measurementId: "G-TXF3WKGZPM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };