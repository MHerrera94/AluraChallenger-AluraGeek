import { userService } from "../service/user-service.js";

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
    window.location.href = "../index.html";
  } else {
    alert("Intente nuevamente Datos incorrectos");
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
