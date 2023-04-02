function comprobarCookies() {
  var x = sessionStorage.getItem("idSession");
  if (x != null) {
    const btnLogout = document.getElementById("logout");
    const btnLogin = document.getElementById("login");
    const home = document.getElementById("home");
    btnLogout.classList.remove("disable__logout");
    if (btnLogin != null) {
      btnLogin.classList.add("disable__login");
    }
    if (home != null) {
      home.classList.remove("disable__logout");
    }

    btnLogout.addEventListener("click", (event) => {
      sessionStorage.clear();
    });
  }
}
comprobarCookies();
