// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmavtGhpHVwBR8K_xbaJEIrQXXmffvRa4",
  authDomain: "cultural-quiz.firebaseapp.com",
  projectId: "cultural-quiz",
  storageBucket: "cultural-quiz.appspot.com",
  messagingSenderId: "467600906383",
  appId: "1:467600906383:web:c520ab5e02a699a091b8fa",
  measurementId: "G-L35GMG96JJ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebaseApp.auth();
const GoogleProvider = new GoogleAuthProvider();

export const signWithGoogle = () => {
  signInWithPopup(auth, GoogleProvider).then((data: any) => {
    localStorage.setItem("user", JSON.stringify(data));
  });
};
