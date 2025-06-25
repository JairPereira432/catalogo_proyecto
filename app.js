let productos = [];
const busqueda = document.querySelector("#search");
const btnsearchContainer = document.querySelector("#categorias");
const contenedor = document.querySelector("#productos");
let categoriaSeleccionada = "all";
const handleLogin = () => {
  const loginForm = document.querySelector("#login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.querySelector("#username").value;
      const password = document.querySelector("#password").value;
      const mensaje = document.querySelector("#mensaje");

      try {
        const response = await fetch("http://127.0.0.1:8000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: username,
            password,
          }),
        });
        if (!response.ok) {
          throw new Error("Error en la respuesta de la API");
        }
        const data = await response.json();
        localStorage.setItem("token", data.token);
        mensaje.textContent = "Login exitoso";
        mensaje.classList.add("text-green-500");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
      } catch (error) {
        console.error("Error al hacer login:", error);
        mensaje.textContent = "Error al hacer login";
        mensaje.classList.add("text-red-500");
        setTimeout(() => {
          mensaje.textContent = "";
          mensaje.classList.remove("text-red-500");
        }, 2000);
      }
    });
  }
  if (contenedor && busqueda && btnsearchContainer) {
    cargarCategorias();
    cargarProductos();
    busqueda.addEventListener("input", filtrarProductos);
  }
};

// const cargarProductos = async () => {
//   try {
//     const response = await fetch("http://127.0.0.1:8000/api/productos"); //https://fakestoreapi.com/products para la api de store
//     if (!response.ok) {
//       throw new Error("Error en la respuesta de la API");
//     }
//     productos = await response.json();
//     if (productos.length === 0) {
//       console.warn("no hay productos");
//       throw new Error("No se encontraron productos");
//     } else {
//       mostrarProductos(productos);
//     }
//   } catch (error) {
//     console.error("Error al cargar los productos:", error);
//     contenedor.innerHTML = "<p>Error al cargar los productos</p>";
//   }
// };

//consumir api propia
const cargarProductos = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/productos"); 
    if (!response.ok) {
      throw new Error("Error en la respuesta de la API");
    }
    productos = await response.json();
    if (productos.length === 0) {
      console.warn("no hay productos");
      throw new Error("No se encontraron productos");
    } else {
      mostrarProductos(productos);
    }
  } catch (error) {
    console.error("Error al cargar los productos:", error);
    contenedor.innerHTML = "<p>Error al cargar los productos</p>";
  }
};

const cargarCategorias = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/categorias");
    if (!response.ok) {
      throw new Error("Error en la respuesta de la API");
    }
    const categorias = await response.json();
    // Mapea solo los nombres de las categorías
    const nombresCategorias = categorias.map(cat => cat.nombre);
    mostrarCategorias(["all", ...nombresCategorias]);
  } catch (error) {
    console.error("Error al cargar las categorias:", error);
  }
};
const mostrarCategorias = (categorias) => {
  btnsearchContainer.innerHTML = "";
  categorias.forEach((categoria) => {
    const btn = document.createElement("button");
    btn.classList.add(
  "px-4",
  "py-2",
  "rounded",
  "mr-2",
  "mb-2",
  "transition-colors",
  "duration-300",
  "cursor-pointer",
  "font-semibold",
  "border"
);

if (categoria === categoriaSeleccionada) {
  btn.classList.add("bg-[#F5F5F5]", "text-[#121212]", "border-transparent", "hover:bg-[#e5e5e5]");
} else {
  btn.classList.add("bg-transparent", "text-[#F5F5F5]", "border-[#F5F5F5]", "hover:bg-[#1E1E1E]");
}


    btn.textContent =
      categoria === "all"
        ? "Todos"
        : categoria.charAt(0).toUpperCase() + categoria.slice(1);
    btn.addEventListener("click", () => {
      categoriaSeleccionada = categoria;
      mostrarCategorias(categorias);
      filtrarProductos();
    });
    btnsearchContainer.append(btn);
  });
};
const filtrarProductos = () => {
  let filtrados = productos;
  if (categoriaSeleccionada !== "all") {
    filtrados = filtrados.filter((p) =>
      Array.isArray(p.categorias) &&
      p.categorias.some(cat => cat.nombre === categoriaSeleccionada)
    );
  }
  const text = busqueda.value.toLowerCase();
  if (text.trim() !== "") {
    filtrados = filtrados.filter(
      (p) =>
        p.titulo.toLowerCase().includes(text) ||
        p.descripcion.toLowerCase().includes(text)
    );
  }
  mostrarProductos(filtrados);
};

// const mostrarProductos = (productos) => {
//   contenedor.innerHTML = "";
//   productos.forEach((producto) => {
//     const { id, image, title, price, description, category } = producto;
//     const div = document.createElement("div");
//     div.classList.add(
//       "bg-white",
//       "rounded-lg",
//       "shadow-md",
//       "p-4",
//       "flex",
//       "flex-col",
//       "items-center",
//       "justify-between",
//       "hover:shadow-lg",
//       "transition-shadow",
//       "duration-300"
//     );
//     div.innerHTML = `
//         <img src="${image}" alt="${title}" loading="lazy" class="w-32 h-32 object-contain mb-4">
//         <h2 class="text-center font-bold mb-2 text-[#1E1E1E]">${title}</h2>
//         <p class="text-lg font-semibold text-[#4B4B4B] mb-4 mt-auto">Precio: $${price}</p>
//         <button 
//           class="open-details cursor-pointer bg-[#121212] text-[#F5F5F5] hover:bg-[#333333] transition px-4 py-2 rounded self-stretch"
//           data-id="${id}"
//           data-title="${encodeURIComponent(title)}"
//           data-description="${encodeURIComponent(description)}"
//           data-price="${price}"
//           data-category="${encodeURIComponent(category)}"
//         >Detalles</button>
//       `;
//     contenedor.append(div);
//   });
// };

//Api propia de productos
const mostrarProductos = (productos) => {
  contenedor.innerHTML = "";
  productos.forEach((producto) => {
    const { id, imagen, titulo, precio, descripcion, categorias } = producto;
    const div = document.createElement("div");
    div.classList.add(
      "bg-white",
      "rounded-lg",
      "shadow-md",
      "p-4",
      "flex",
      "flex-col",
      "items-center",
      "justify-between",
      "hover:shadow-lg",
      "transition-shadow",
      "duration-300"
    );
    div.innerHTML = `
        <img src="${imagen}" alt="${titulo}" loading="lazy" class="w-32 h-32 object-contain mb-4">
        <h2 class="text-center font-bold mb-2 text-[#1E1E1E]">${titulo}</h2>
        <p class="text-lg font-semibold text-[#4B4B4B] mb-4 mt-auto">Precio: $${precio}</p>
        <button 
          class="open-details cursor-pointer bg-[#121212] text-[#F5F5F5] hover:bg-[#333333] transition px-4 py-2 rounded self-stretch"
          data-id="${id}"
          data-title="${encodeURIComponent(titulo)}"
          data-description="${encodeURIComponent(descripcion)}"
          data-price="${precio}"
          data-category="${encodeURIComponent(categorias.map((cat)=> cat.nombre).join(", "))}"
        >Detalles</button>
      `;
    contenedor.append(div);    
  });
};


document.addEventListener("click", function (e) {
  if (e.target.classList.contains("open-details")) {
    const btn = e.target;
    const title = decodeURIComponent(btn.getAttribute("data-title") || "");
    const description = decodeURIComponent(btn.getAttribute("data-description") || "");
    const price = btn.getAttribute("data-price") || "";
    const category = decodeURIComponent(btn.getAttribute("data-category") || "");
    const id = btn.getAttribute("data-id") || ""; // <-- Asegúrate de pasar el id en el botón
    const dialog = document.getElementById("dialog");
    if (!dialog) return;
    dialog.querySelector("h2").textContent = title;
    dialog.querySelector("#dialog-message").innerHTML = `
      <span class="block mb-2"><strong>Descripción:</strong> ${description}</span>
      <span class="block mb-2">
  <strong>Categoría:</strong> ${category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
</span>

      <span class="block mb-2 text-[#1E1E1E] font-bold"><strong>Precio:</strong> $${price}</span>
      <button id="to-details-products" data-id="${id}" class="cursor-pointer w-full bg-[#121212] text-[#F5F5F5] hover:bg-[#333333] transition py-2 rounded">Ir a detalles del producto</button>
    `;
    dialog.setAttribute("open", "");
  }
  if (e.target.id === "close-dialog") {
    const dialog = document.getElementById("dialog");
    if (dialog) dialog.removeAttribute("open");
  }
});

document.addEventListener("click", function (e) {
  const dialog = document.getElementById("dialog");
  if (
    dialog &&
    dialog.hasAttribute("open") &&
    e.target.id === "to-details-products"
  ) {
    const id = e.target.getAttribute("data-id");
    if (id) {
      window.location.href = `detalle.html?id=${id}`;
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  handleLogin();
});
