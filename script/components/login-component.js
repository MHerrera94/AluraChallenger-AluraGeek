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
    const btnPoput = document.getElementById("btnPoput");
    poput.classList.remove("hidden");
    document.body.classList.add("block__window");
    btnPoput.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "../index.html";
    });
  } else {
    const poputTitle = document.getElementById("poputTitle");
    const text = "Sesion iniciada con exito";
    poputTitle.innerText = "Intente nuevamente datos incorrectos";
    const btnPoput = document.getElementById("btnPoput");
    poput.classList.remove("hidden");
    document.body.classList.add("block__window");
    btnPoput.addEventListener("click", (event) => {
      event.preventDefault();
      poput.classList.add("hidden");
      poputTitle.innerText = text;
      document.body.classList.remove("block__window");
    });
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
