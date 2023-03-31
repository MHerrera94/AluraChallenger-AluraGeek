import { productService } from "../service/product-service.js";
const x = sessionStorage.getItem("idSession");

const createNewItem = (urlImg, nameProduct, cost, id, itemNumber) => {
  const ul = document.createElement("ul");
  ul.classList.add("item__container");
  const product_content = `<li class="item__img"><img src="${urlImg}" alt="product_img" class="img__imagen">
  <a href="#" class="item__boton- borrar disable" id="${id}"></a>
  <a href="./agregar_producto.html?id=${id}" class="item__boton- editar disable"></a></li>
  <li class="item__title">${nameProduct}</li>
  <li class="item__cost">$ ${cost}</li>
  <li class="item__id">#${itemNumber}</li>`;

  ul.innerHTML = product_content;
  const btn_delete = ul.querySelector("a");
  btn_delete.addEventListener("click", async () => {
    const btnID = document.querySelector("ul").querySelector("a").id;
    await productService.deleteProduct(btnID);
  });
  return ul;
};
const productContainer = document.getElementById("itemContainer");
const removeDisable = () => {
  if (x != null) {
    const bdelete = document.getElementsByClassName("borrar");
    const editar = document.getElementsByClassName("editar");
    const btnAgregar = document.getElementById("btnAgregar");
    btnAgregar.classList.remove("disable");

    for (let i = 0; i < editar.length; i++) {
      editar[i].classList.remove("disable");
    }
    for (let i = 0; i < bdelete.length; i++) {
      bdelete[i].classList.remove("disable");
    }
  }
};
productService.onGetProducts((querySnapshot) => {
  productContainer.innerHTML = "";
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const newItem = createNewItem(
      data.urlImg,
      data.nameProduct,
      data.cost,
      doc.id,
      data.itemNumber
    );
    productContainer.appendChild(newItem);
    removeDisable();
  });
});
