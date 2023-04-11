import { userService } from "../service/user-service.js";
const body_container = document.getElementById("container");

const redirigirLogin = () => {
  let id = sessionStorage.getItem("idSession");
  if (id != null) {
    window.location.href = "../index.html";
  }
};
redirigirLogin();
const loginForm = document.getElementById("login__form");
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  let idSession = "";
  if (validate()) {
    const querySnapshot = await userService.userCollection();
    querySnapshot.forEach((doc) => {
      const user = doc.data();
      if (user.email == email && user.password == password) {
        idSession = user.idSession;
        return idSession;
      }
    });
  }
  if (idSession != "") {
    sessionStorage.setItem("idSession", idSession);
    userService.insertPoput(body_container, "Inicio de sesion correcto");
    const btnPoput = document.getElementById("btnPoput");
    poput.classList.remove("hidden");
    document.body.classList.add("block__window");
    btnPoput.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "../index.html";
    });
  } else {
    userService.insertPoput(
      body_container,
      "Datos incorrectos intente nuevamente"
    );
    const btnPoput = document.getElementById("btnPoput");
    poput.classList.remove("hidden");
    document.body.classList.add("block__window");
    btnPoput.addEventListener("click", (event) => {
      event.preventDefault();
      poput.classList.add("hidden");
      userService.removePoput(body_container);
      document.body.classList.remove("block__window");
    });
  }
});
const hiddenPassword = document.getElementById("hidden_password");
hiddenPassword.addEventListener("change", (event) => {
  const password = document.getElementById("password");
  event.preventDefault();
  if (hiddenPassword.checked) {
    password.type = "text";
  } else {
    password.type = "password";
  }
});
const validate = () => {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  if (email.value.length == 0) {
    alert("Debe rellenar todos los campos");
    return;
  }
  if (password.value.length == 0) {
    alert("Debe rellenar todos los campos");
    return;
  }
  return true;
};
