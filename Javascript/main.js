
// ARRAYS PRODUCTOS 
const productos = [
  { id: 1, nombre: "Auriculares Inalámbricos Pro", precio: 89.99, img: "img/Auriculares1.jpg" },
  { id: 2, nombre: "Auriculares Gaming X500", precio: 79.99, img: "img/Auriculares2.png" },
  { id: 3, nombre: "Auriculares Bluetooth Compact", precio: 49.99, img: "img/Auriculares3.jpg" },
  { id: 4, nombre: "Ratón Gamer X200 RGB", precio: 49.99, img: "img/Raton1.jpg" },
  { id: 5, nombre: "Ratón Inalámbrico Slim", precio: 29.99, img: "img/Raton2.jpg" },
  { id: 6, nombre: "Ratón Ergonómico Comfort Pro", precio: 39.99, img: "img/Raton3.jpg" },
  { id: 7, nombre: "Ratón Gamer HyperSpeed", precio: 59.99, img: "img/Raton4.jpg" },
  { id: 8, nombre: "Teclado Mecánico RGB Pro", precio: 89.99, img: "img/Teclado1.jpg" },
  { id: 9, nombre: "Teclado Inalámbrico Compact", precio: 49.99, img: "img/Teclado2.jpg" },
  { id: 10, nombre: "Teclado Gamer UltraSpeed", precio: 69.99, img: "img/Teclado3.jpg" },
  { id: 11, nombre: "Teclado Ergonómico OfficePro", precio: 59.99, img: "img/Teclado4.jpg" },
  { id: 12, nombre: "Monitor Gamer UltraWide 34", precio: 399.99, img: "img/Monitor1.jpg" },
  { id: 13, nombre: "Monitor Profesional 27 4K", precio: 349.99, img: "img/Monitor2.jpg" }
];


// CARRITO 

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function activarBotonesComprar() {
  const botones = document.querySelectorAll("main section:nth-of-type(2) > div button");

  botones.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const producto = productos[index];
      agregarAlCarrito(producto);
    });
  });
}

function agregarAlCarrito(producto) {
  const existe = carrito.find(item => item.id === producto.id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({
      ...producto,
      cantidad: 1
    });
  }

  guardarCarrito();
  mostrarCarrito();
}

function mostrarCarrito() {
  const contenedor = document.getElementById("carrito");

  contenedor.innerHTML = ""; 

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>El carrito está vacío.</p>";
    return;
  }

  let total = 0;

  carrito.forEach(producto => {
    total += producto.precio * producto.cantidad;

    const item = document.createElement("div");
    item.classList.add("carrito-item");

    item.innerHTML = `
      <p>${producto.nombre} x${producto.cantidad}</p>
      <p>$${(producto.precio * producto.cantidad).toFixed(2)}</p>
      <button class="eliminar" data-id="${producto.id}">✖</button>
    `;

    contenedor.appendChild(item);
  });

  const totalDiv = document.createElement("div");
  totalDiv.id = "carrito-total";
  totalDiv.textContent = `Total: $${total.toFixed(2)}`;

  contenedor.appendChild(totalDiv);

  activarBotonesEliminar();
  actualizarContador();
   }


function activarBotonesEliminar() {
  const botones = document.querySelectorAll(".eliminar");

  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);

      carrito = carrito.filter(p => p.id !== id);
      guardarCarrito();
      mostrarCarrito();
    });
  });
}

const btnCarrito = document.getElementById("btn-carrito");
const dropdown = document.getElementById("carrito-dropdown");
const contador = document.getElementById("carrito-contador");

btnCarrito.addEventListener("click", () => {
  dropdown.classList.toggle("activo");
});

function actualizarContador() {
  let totalItems = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  contador.textContent = totalItems;
}
document.addEventListener("DOMContentLoaded", () => {
  activarBotonesComprar();
  mostrarCarrito();
});
