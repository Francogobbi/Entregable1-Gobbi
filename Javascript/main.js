//  Tienda Tech 
console.log("JavaScript cargado correctamente.");

//  VARIABLES Y CONSTANTES
const tienda = "Tienda Tech";
let usuario = "";
const productos = ["Auriculares", "Ratón", "Teclado", "Monitor"];

//  SALUDO AL USUARIO
usuario = prompt("Bienvenido a " + tienda + ". ¿Cuál es tu nombre?");

if (usuario) {
  alert(`Hola ${usuario}, ¡gracias por visitar nuestra tienda!`);
} else {
  alert("Bienvenido visitante 👤");
  usuario = "Invitado";
}

console.log("Usuario:", usuario);

//  MOSTRAR PRODUCTOS 
const verProductos = confirm("¿Quieres ver nuestros productos disponibles?");

if (verProductos) {
  alert("🛍 Nuestros productos son:\n- " + productos.join("\n- "));
  console.log("Productos mostrados:", productos);
} else {
  alert("No hay problema, puedes explorarlos en la página.");
}

//  ELEGIR PRODUCTOS
function elegirProducto() {
  let eleccion = prompt("¿Qué producto te interesa? (Auriculares, Ratón, Teclado o Monitor)");

  if (productos.includes(eleccion)) {
    alert(`Excelente elección, ${usuario}! Has elegido: ${eleccion}`);
    console.log(`${usuario} eligió: ${eleccion}`);
  } else {
    alert("No tenemos ese producto. Intenta con uno de la lista.");
    console.warn("Elección inválida:", eleccion);
  }
}

const comprar = confirm("¿Quieres elegir un producto para comprar?");
if (comprar) {
  elegirProducto();
} else {
  alert("Perfecto, sigue explorando nuestra tienda 🛒");
}
