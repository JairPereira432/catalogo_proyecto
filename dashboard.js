// Datos de ejemplo (simulando una base de datos)
let products = [
    { id: 1, name: "Producto 1", price: 100 },
    { id: 2, name: "Producto 2", price: 200 }
];

// Elementos del DOM
const adminToggle = document.getElementById('adminToggle');
const adminSection = document.getElementById('adminSection');
const productForm = document.getElementById('productForm');
const adminProductList = document.getElementById('adminProductList');
const productList = document.getElementById('productList');

// Mostrar productos públicos
function renderProducts() {
    productList.innerHTML = products.map(product => `
        <div class="col-md-4 mb-3">
            <div class="card">
                <div class="card-body">
                    <h5>${product.name}</h5>
                    <p>$${product.price}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Mostrar productos en panel admin (con controles)
function renderAdminProducts() {
    adminProductList.innerHTML = products.map(product => `
        <div class="card mb-2">
            <div class="card-body">
                <h5>${product.name}</h5>
                <p>$${product.price}</p>
                <button onclick="editProduct(${product.id})" class="btn btn-warning btn-sm">Editar</button>
                <button onclick="deleteProduct(${product.id})" class="btn btn-danger btn-sm">Eliminar</button>
            </div>
        </div>
    `).join('');
}

// Toggle del modo admin
adminToggle.addEventListener('click', () => {
    adminSection.style.display = adminSection.style.display === 'none' ? 'block' : 'none';
});

// Agregar nuevo producto
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newProduct = {
        id: products.length + 1,
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value)
    };
    products.push(newProduct);
    renderProducts();
    renderAdminProducts();
    productForm.reset();
});

// Funciones de editar/eliminar (simplificadas)
function editProduct(id) {
    const product = products.find(p => p.id === id);
    const newName = prompt("Nuevo nombre:", product.name);
    if (newName) product.name = newName;
    renderAdminProducts();
}

function deleteProduct(id) {
    if (confirm("¿Eliminar producto?")) {
        products = products.filter(p => p.id !== id);
        renderAdminProducts();
        renderProducts();
    }
}

// Inicializar
renderProducts();