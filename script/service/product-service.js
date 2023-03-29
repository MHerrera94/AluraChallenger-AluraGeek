// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  getDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
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
const crearProducto = (
  urlImg,
  category,
  nameProduct,
  cost,
  productDescripton,
  itemNumber
) =>
  addDoc(collection(db, "productos"), {
    urlImg,
    category,
    nameProduct,
    cost,
    productDescripton,
    itemNumber,
  });
/* CRUD: Read */
const listProducts = () => getDocs(collection(db, "productos"));
const detailProduct = (id) => getDoc(doc(db, "productos", id));
const onGetProducts = (callback) =>
  onSnapshot(collection(db, "productos"), callback);
/*CRUD: Update*/
const upgradeProduct = (id, newField) =>
  updateDoc(doc(db, "productos", id), newField);
/*CRUD: Delete*/
const deleteProduct = (id) => deleteDoc(doc(db, "productos", id));
/*Export de todos los metodos CRUD*/
export const productService = {
  crearProducto,
  listProducts,
  detailProduct,
  onGetProducts,
  deleteProduct,
  upgradeProduct,
};
