// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPGfUnGw24Any0LsFdXEkaLSZ-I8WsfUU",
  authDomain: "jaraahai-mn.firebaseapp.com",
  projectId: "jaraahai-mn",
  storageBucket: "jaraahai-mn.appspot.com",
  messagingSenderId: "193384316834",
  appId: "1:193384316834:web:53362e586210b165e97cfb",
  measurementId: "G-CEPDZTJSZY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
