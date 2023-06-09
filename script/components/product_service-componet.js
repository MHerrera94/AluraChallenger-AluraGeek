import { productService } from "../service/product-service.js";

const createNewItem = (urlImg, nameProduct, cost, id) => {
  const ul = document.createElement("ul");
  ul.classList.add("seccion__item");
  const product_content = `<li class="item__img">
    <img src="${urlImg}" alt="" />
  </li>
  <li class="item__title">${nameProduct}</li>
  <li class="item__costo">$ ${cost}</li>
  <li class="item__link">
    <a href="./page/detalle_producto.html?id=${id}">Ver Producto</a>
  </li>`;

  ul.innerHTML = product_content;
  return ul;
};
const star_wars = document.getElementById("star_wars");
const consola = document.getElementById("consola");
const variedades = document.getElementById("variedades");

const divContainer_starWars = document.createElement("div");
divContainer_starWars.classList.add("item__container");
const divContainer_consola = document.createElement("div");
divContainer_consola.classList.add("item__container");
const divContainer_variedades = document.createElement("div");
divContainer_variedades.classList.add("item__container");

const generarItem = (maxItem) => {
  let itemConsola = 0;
  let itemStarWars = 0;
  let itemVariedades = 0;
  productService.onGetProducts((querySnapshot) => {
    divContainer_starWars.innerHTML = "";
    divContainer_consola.innerHTML = "";
    divContainer_variedades.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const newItem = createNewItem(
        data.urlImg,
        data.nameProduct,
        data.cost,
        doc.id
      );
      if (maxItem == 0) {
        switch (data.category) {
          case "starWars" || "star wars" || "star Wars" || "starwars":
            divContainer_starWars.appendChild(newItem);
            break;

          case "consola":
            divContainer_consola.appendChild(newItem);
            break;

          default:
            divContainer_variedades.appendChild(newItem);
            break;
        }
      } else {
        switch (data.category) {
          case "starWars" || "star wars" || "star Wars" || "starwars":
            if (itemStarWars <= maxItem) {
              divContainer_starWars.appendChild(newItem);
              itemStarWars++;
            }
            break;

          case "consola":
            if (itemConsola <= maxItem) {
              divContainer_consola.appendChild(newItem);
              itemConsola++;
            }
            break;

          default:
            if (itemVariedades <= maxItem) {
              divContainer_variedades.appendChild(newItem);
              itemVariedades++;
            }
            break;
        }
      }
    });

    star_wars.appendChild(divContainer_starWars);
    consola.appendChild(divContainer_consola);
    variedades.appendChild(divContainer_variedades);
  });
};

const mediaqueryList = window.matchMedia("(max-width: 768px)");
const mediaqueryListWrong = window.matchMedia("(max-width: 1440px)");
mediaqueryList.addEventListener("change", () => {
  if (mediaqueryList.matches) {
    generarItem(3);
  } else if (mediaqueryListWrong.matches) {
    generarItem(5);
  } else {
    generarItem(0);
  }
});

if (mediaqueryList.matches) {
  generarItem(3);
} else if (mediaqueryListWrong.matches) {
  generarItem(5);
} else {
  generarItem(0);
}
