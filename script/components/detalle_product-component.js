import { productService } from "../service/product-service.js";

const detailContaint = document.getElementById("detailContaint");
const similarProduct = document.getElementById("similarProduct");
let category = "";
let productName = "";

const createNewDetail = (urlImg, nameProduct, cost, productDescription) => {
  const content = `<div class="detalle__img">
    <img src="${urlImg}" alt="${nameProduct}" class="detalle__img__imagen">
  </div>
  <div class="detalle__description">
    <h1 class="detalle__description__title">${nameProduct}</h1>
    <p class="detalle__description__costo"> $ ${cost}</p>
    <p class="detalle__description_description">${productDescription}</p>
  </div>`;
  return content;
};

const createNewItem = (urlImg, nameProduct, cost, id) => {
  const ul = document.createElement("ul");
  ul.classList.add("seccion__item");
  const content = `<li class="item__img">
  <img src="${urlImg}" alt="${nameProduct}" />
</li>
<li class="item__title">${nameProduct}</li>
<li class="item__costo">$ ${cost}</li>
<li class="item__link">
  <a href="./detalle_producto.html?id=${id}">Ver Producto</a>
</li>`;
  ul.innerHTML = content;
  return ul;
};
const getProduct = async () => {
  const url = new URL(window.location);
  const id = url.searchParams.get("id");

  if (id == null) {
    Window.location.href = "./productos.html";
    alert("Hubo un error lo estamos solucionando");
  }
  try {
    detailContaint.innerHTML = "";
    const product = await productService.detailProduct(id);
    const data = product.data();
    if (data.nameProduct && data.cost) {
      const content = createNewDetail(
        data.urlImg,
        data.nameProduct,
        data.cost,
        data.productDescripton
      );
      category = data.category;
      productName = data.nameProduct;
      detailContaint.innerHTML = content;
      console.log(category);
    }
  } catch (error) {
    console.log(error);
  }
};
const getSeccionSimilar = () => {
  const url = new URL(window.location);
  const id = url.searchParams.get("id");

  if (id == null) {
    Window.location.href = "./productos.html";
    alert("Hubo un error lo estamos solucionando");
  }

  try {
    productService.onGetProducts((querySnapshot) => {
      similarProduct.innerHTML = "";
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (category == data.category) {
          if (productName != data.nameProduct) {
            const newItem = createNewItem(
              data.urlImg,
              data.nameProduct,
              data.cost,
              doc.id
            );
            similarProduct.appendChild(newItem);
          }
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};
getProduct();
getSeccionSimilar();
