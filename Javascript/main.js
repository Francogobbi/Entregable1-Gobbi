
let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

async function cargarProductos() {
  const resp = await fetch("productos.json");
  productos = await resp.json();
  renderizarProductos();
  activarBotonesComprar();
  mostrarCarrito();
}

function renderizarProductos() {
  const contenedor = document.getElementById("lista-productos");
  contenedor.innerHTML = "";

  productos.forEach(prod => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${prod.nombre}</h3>
      <img src="${prod.img}" alt="${prod.nombre}">
      <h4>Precio: $${prod.precio}</h4>
      <button data-id="${prod.id}">Comprar</button>
    `;
    contenedor.appendChild(div);
  });
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function activarBotonesComprar() {
  const botones = document.querySelectorAll("#lista-productos button");

  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const producto = productos.find(p => p.id === id);
      agregarAlCarrito(producto);
    });
  });
}

function agregarAlCarrito(producto) {
  const existe = carrito.find(p => p.id === producto.id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito();
  mostrarCarrito();

  Swal.fire({
    icon: "success",
    title: "Producto agregado",
    text: producto.nombre,
    timer: 1200,
    showConfirmButton: false
  });
}

function mostrarCarrito() {
  const contenedor = document.getElementById("carrito");
  const contador = document.getElementById("carrito-contador");

  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>El carrito está vacío.</p>";
    contador.textContent = 0;
    return;
  }

  let total = 0;
  let totalItems = 0;

  carrito.forEach(prod => {
    total += prod.precio * prod.cantidad;
    totalItems += prod.cantidad;

    const div = document.createElement("div");
    div.classList.add("carrito-item");
    div.innerHTML = `
      <p>${prod.nombre} x${prod.cantidad}</p>
      <p>$${(prod.precio * prod.cantidad).toFixed(2)}</p>
      <button class="eliminar" data-id="${prod.id}">✖</button>
    `;
    contenedor.appendChild(div);
  });

  const totalDiv = document.createElement("div");
  totalDiv.id = "carrito-total";
  totalDiv.innerHTML = `
    Total: $${total.toFixed(2)}
    <br><br>
    <button id="finalizar">Finalizar compra</button>
  `;
  contenedor.appendChild(totalDiv);

  contador.textContent = totalItems;

  activarBotonesEliminar();
  document.getElementById("finalizar").addEventListener("click", finalizarCompra);
}

function activarBotonesEliminar() {
  document.querySelectorAll(".eliminar").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      carrito = carrito.filter(p => p.id !== id);
      guardarCarrito();
      mostrarCarrito();
    });
  });
}

function finalizarCompra() {
  Swal.fire({
    title: "¿Confirmar compra?",
    text: "Gracias por confiar en Tienda Tech",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Comprar"
  }).then(result => {
    if (result.isConfirmed) {
      carrito = [];
      guardarCarrito();
      mostrarCarrito();
      Swal.fire("Compra realizada", "Pedido confirmado", "success");
    }
  });
}

const btnCarrito = document.getElementById("btn-carrito");
const dropdown = document.getElementById("carrito-dropdown");

btnCarrito.addEventListener("click", () => {
  dropdown.classList.toggle("activo");
});

document.addEventListener("DOMContentLoaded", cargarProductos);
