function comprobarCookies() {
  var x = sessionStorage.getItem("usuario");
  if (x != null) {
    window.alert("funciona");
  }
}
