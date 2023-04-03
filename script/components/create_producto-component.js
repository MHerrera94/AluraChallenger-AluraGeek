import { productService } from "../service/product-service.js";

const productForm = document.getElementById("productForm");
let itemNumber = "";

const obtenerInformacion = async () => {
  const url = new URL(window.location);
  const id = url.searchParams.get("id");

  if (id != null) {
    const urlImg = document.getElementById("image");
    const category = document.getElementById("categoria");
    const nameProduct = document.getElementById("nombre_producto");
    const cost = document.getElementById("costo");
    const description = document.getElementById("descripcion");
    const agregarTitle = document.getElementById("agregar__title");
    const btn_submit = document.getElementById("submit");
    // usando await method
    try {
      const product = await productService.detailProduct(id);
      const data = product.data();
      agregarTitle.innerText = "Actualizacion de productos";
      btn_submit.value = "Actualizar producto";
      if (data.nameProduct && data.category) {
        urlImg.value = data.urlImg;
        category.value = data.category;
        nameProduct.value = data.nameProduct;
        cost.value = data.cost;
        description.value = data.productDescripton;
        itemNumber = data.itemNumber;
      } else {
        throw new Error();
      }
    } catch (error) {
      window.location.href = "./productos.html";
      alert("Ocurrio un error al cargar los datos");
      console.log(error);
    }
  }
};

obtenerInformacion();

productForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const url = new URL(window.location);
  const id = url.searchParams.get("id");
  if (id == null) {
    addProduct();
  } else {
    updateProduct();
  }
});
const updateProduct = async () => {
  const url = new URL(window.location);
  const id = url.searchParams.get("id");

  const urlImg = document.getElementById("image").value;
  const category = document.getElementById("categoria").value;
  const nameProduct = document.getElementById("nombre_producto").value;
  const cost = document.getElementById("costo").value;
  const description = document.getElementById("descripcion").value;
  try {
    await productService.upgradeProduct(id, {
      urlImg: urlImg,
      category: category,
      nameProduct: nameProduct,
      cost: cost,
      productDescripton: description,
      itemNumber: itemNumber,
    });
    const btnPoput = document.getElementById("btnPoput");
    const poputTitle = document.getElementById("poputTitle");
    poputTitle.innerText = "Producto actualizado con exito";
    poput.classList.remove("hidden");
    document.body.classList.add("block__window");
    btnPoput.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "./productos.html";
    });
  } catch (error) {
    console.error();
  }
};
const addProduct = async () => {
  const urlImg = document.getElementById("image").value;
  const category = document.getElementById("categoria").value;
  const nameProduct = document.getElementById("nombre_producto").value;
  const cost = document.getElementById("costo").value;
  const description = document.getElementById("descripcion").value;
  let itemNumber = Math.floor(Math.random() * 90000 + 10000);

  try {
    // const div_poput = Document.getElementById("poput");
    if (validacionDatos(urlImg, category, nameProduct, cost, description)) {
      const products = await productService.crearProducto(
        urlImg,
        category,
        nameProduct,
        cost,
        description,
        itemNumber
      );
      poput.classList.remove("hidden");
      document.body.classList.add("block__window");
    }
  } catch (error) {
    console.error();
  }
};
const validacionDatos = (urlImg, category, nameProduct, cost, description) => {
  if (urlImg.length == 0) {
    alert("Debe ingresar la url de la imagen");
    return;
  }
  if (category.length == 0) {
    alert("Debe ingresar la categoria del producto");
    return;
  }
  if (nameProduct.length == 0) {
    alert("Debe ingresar el nombre del producto");
    return;
  }
  if (cost.length == 0) {
    alert("Debe ingresar el precio del producto");
    return;
  }
  if (description.length == 0) {
    alert("Debe ingresar la descripcion del producto");
    return;
  }
  return true;
};
