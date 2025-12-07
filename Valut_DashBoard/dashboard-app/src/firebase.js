// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnvWKgnN0KE2vc-GKVVVWhbNX70edkpsg",
  authDomain: "nebula-valut.firebaseapp.com",
  databaseURL: "https://nebula-valut-default-rtdb.firebaseio.com",
  projectId: "nebula-valut",
  storageBucket: "nebula-valut.firebasestorage.app",
  messagingSenderId: "324403117688",
  appId: "1:324403117688:web:48dba824652d1eadb1b78d",
  measurementId: "G-PHXPCT7DVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getDatabase(app)