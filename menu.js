const toggleBtn = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
let menuOpen = false;

// Función para cargar y mostrar productos
async function cargarProductos() {
  try {
    const response = await fetch('api/productos.php');
    const productos = await response.json();
    
    const contenedor = document.getElementById('productos-container');
    if (!contenedor) {
      console.error('No se encontró el contenedor de productos');
      return;
    }
    
    contenedor.innerHTML = '';
    
    if (productos.length === 0) {
      contenedor.innerHTML = '<p class="text-center py-8">No hay productos disponibles.</p>';
      return;
    }
    
    productos.forEach(producto => {
      const productoHTML = `
        <div class="producto bg-white rounded-lg shadow-md overflow-hidden">
          <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full h-48 object-cover">
          <div class="p-4">
            <h3 class="font-bold text-lg">${producto.nombre}</h3>
            <p class="text-gray-600 mt-2">${producto.descripcion}</p>
            <p class="text-blue-600 font-bold mt-2">$${producto.precio.toFixed(2)}</p>
          </div>
        </div>
      `;
      contenedor.innerHTML += productoHTML;
    });
    
    // Mostrar la sección de productos (si estaba oculta)
    const seccionProductos = document.getElementById('seccion-productos');
    if (seccionProductos) {
      seccionProductos.classList.remove('hidden');
      window.scrollTo({
        top: seccionProductos.offsetTop,
        behavior: 'smooth'
      });
    }
  } catch (error) {
    console.error('Error al cargar productos:', error);
    const contenedor = document.getElementById('productos-container');
    if (contenedor) {
      contenedor.innerHTML = '<p class="text-center py-8 text-red-500">Error al cargar los productos. Por favor intenta nuevamente.</p>';
    }
  }
}

// Manejar clic en el botón Catálogo
function setupCatalogoButton() {
  const catalogoBtn = document.querySelector('a[href*="catalogo"], a[href*="catalogo.html"]');
  if (catalogoBtn) {
    catalogoBtn.addEventListener('click', function(e) {
      // Si estamos en la página de catálogo, prevenir comportamiento por defecto
      if (window.location.pathname.includes('catalogo.html')) {
        e.preventDefault();
      }
      cargarProductos();
    });
  }
}

// Toggle del menú móvil
toggleBtn.addEventListener("click", () => {
  menuOpen = !menuOpen;
  navMenu.classList.toggle("hidden");
  toggleBtn.textContent = menuOpen ? "✕" : "☰";
});

// Manejo de sesión de usuario
const main = document.querySelector("main");

if (localStorage.getItem("token")) {
  const subnav = document.getElementById("subnav-public");
  if (subnav) subnav.remove();

  // Verifica si el botón de cerrar sesión ya existe
  if (!document.getElementById("logout-btn")) {
    // Si el usuario es admin, muestra el botón de agregar producto
    fetch("http://127.0.0.1:8000/api/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((user) => {
        if (user && user.rol === "admin") {
          if (!document.getElementById("add-product-btn")) {
            const addProductBtn = document.createElement("a");
            addProductBtn.id = "add-product-btn";
            addProductBtn.href = "crea-producto.html";
            addProductBtn.textContent = "Agregar producto";
            addProductBtn.className =
              "block bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700 text-center";
            const logOutBtn = document.getElementById("logout-btn");
            if (logOutBtn) {
              navMenu.insertBefore(addProductBtn, logOutBtn);
            } else {
              navMenu.appendChild(addProductBtn);
            }
          }
        }
      });

    const logOutBtn = document.createElement("button");
    logOutBtn.id = "logout-btn";
    logOutBtn.textContent = "Cerrar sesión";
    logOutBtn.className =
      "bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600 cursor-pointer";
    logOutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.reload();
    });
    navMenu.appendChild(logOutBtn);
  }
} else {
  if (main && !document.getElementById("subnav-public")) {
    const subnav = document.createElement("div");
    subnav.id = "subnav-public";
    subnav.className = "w-full flex justify-center gap-4 py-2";
    subnav.innerHTML = `
      <a href="login.html" class="text-[#F5F5F5] bg-[#1E1E1E] px-4 py-2 rounded hover:bg-[#333] transition">Login</a>
      <a href="register.html" class="text-[#1E1E1E] bg-[#F5F5F5] px-4 py-2 rounded hover:bg-[#e5e5e5] transition">Registrarse</a>
    `;
    main.insertAdjacentElement("afterbegin", subnav);
  }
  const logOutBtn = document.getElementById("logout-btn");
  if (logOutBtn) logOutBtn.remove();
}

// Configurar el botón de catálogo cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  setupCatalogoButton();
  
  // Si estamos en la página de catálogo, cargar productos automáticamente
  if (window.location.pathname.includes('catalogo.html')) {
    cargarProductos();
  }
});