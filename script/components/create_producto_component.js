import { clientService } from "../service/client-service.js";

const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("funcionando");
  const urlImg = document.getElementById("image").value;
  const category = document.getElementById("categoria").value;
  const nameProduct = document.getElementById("nombre_producto").value;
  const cost = document.getElementById("costo").value;
  const description = document.getElementById("descripcion").value;
  let itemNumber = Math.floor(Math.random() * 90000 + 10000);

  try {
    if (validacionDatos(urlImg, category, nameProduct, cost, description)) {
      const products = await clientService.crearProducto(
        urlImg,
        category,
        nameProduct,
        cost,
        description,
        itemNumber
      );
      alert("Producto agregado con exito");
      productForm.reset();
    }
  } catch (error) {
    console.error();
  }
});
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
