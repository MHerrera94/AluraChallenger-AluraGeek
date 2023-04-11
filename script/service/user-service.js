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
/* Diseño de menu mediante javascript imitando React*/
const createMenu = (url_link, name_boton) => {
  const menu_container = document.createElement("nav");
  menu_container.classList.add("menu");
  const menu_logo = document.createElement("div");
  menu_logo.classList.add("menu__logo");
  const menu_logo_content = `<img
  class="logo__img"
  src="../resource/icon/Logo.png"
  alt="Alura Logo"
/>`;
  menu_logo.innerHTML = menu_logo_content;
  const menu_buscador = document.createElement("div");
  menu_buscador.classList.add("menu__buscador");
  const menu__buscador_content = `<form class="buscador__container" action="" id="buscador">
  <input
    class="buscador__input"
    type="search"
    name="product-search"
    id="product-search"
    placeholder="¿Que deseas buscar?"
  />
  <input
    class="buscador__boton"
    type="submit"
    value=""
    id="btn-buscar"
    />
    </form>`;
  menu_buscador.innerHTML = menu__buscador_content;
  const menu__boton__container = document.createElement("div");
  menu__boton__container.classList.add("menu__boton__container");
  const menu_boton_content = `<input class="menu__main desactive" type="checkbox" id="menu">
    <label class="menu__label desactive" for="menu">Menu</label>
    <div class="menu__login">
      <a href="${url_link}" class="login__boton">${name_boton}</a>
    </div>`;
  menu__boton__container.innerHTML = menu_boton_content;
  menu_container.appendChild(menu_logo);
  menu_container.appendChild(menu_buscador);
  menu_container.appendChild(menu__boton__container);
  return menu_container;
};
/* Diseño de poput mediante javascript imitando React */
const createPoput = (poput_title) => {
  const poput_container = document.createElement("div");
  poput_container.classList.add("poput__confirmation", "hidden");
  poput_container.setAttribute("id", "poput");
  const poput_content = `<div class="poput__confirmation__container">
    <p id="poputTitle" class="poput__confirmation__text">${poput_title}</p>
    <a id="btnPoput" href="" class="poput__confirmation__boton hidden">Aceptar</a>
  </div>`;
  poput_container.innerHTML = poput_content;
  return poput_container;
};
const insertPoput = (nodeParent, text) => {
  const child_before = nodeParent.firstElementChild;
  nodeParent.insertBefore(createPoput(text), child_before.nextSibling);
};
const removePoput = (nodeParent) => {
  const child_before = nodeParent.firstElementChild.nextSibling;
  nodeParent.removeChild(child_before);
};
/*Export de todos los metodos CRUD*/
export const userService = {
  userCollection,
  insertPoput,
  removePoput,
  createMenu,
};
