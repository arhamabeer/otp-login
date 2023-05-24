// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCJDcwY7ZGMTvsSt3PbrvKtViXZcth78b8",
  authDomain: "aaa-otp-verify.firebaseapp.com",
  projectId: "aaa-otp-verify",
  storageBucket: "aaa-otp-verify.appspot.com",
  messagingSenderId: "805647347845",
  appId: "1:805647347845:web:dcba7a7b4192aeea1579ec",
  measurementId: "G-ZTBQCCHP7M",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
