import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {
  getFirestore,
  getDocs,
  doc,
  collection,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOfF5Fh7vVhV78rAGhjEv6v15MjNYJ3O0",
  authDomain: "portafolio-miguelherrera.firebaseapp.com",
  projectId: "portafolio-miguelherrera",
  storageBucket: "portafolio-miguelherrera.appspot.com",
  messagingSenderId: "38753873407",
  appId: "1:38753873407:web:efb554a10bba9f36608bca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/* Metodos CRUD*/
const db = getFirestore();

/* CRUD: Create */

/* CRUD: Read */
const userCollection = () => getDocs(collection(db, "user"));
/*CRUD: Update*/

/*CRUD: Delete*/

/*Export de todos los metodos CRUD*/
export const userService = {
  userCollection,
};
