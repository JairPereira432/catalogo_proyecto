// Datos de ejemplo
let products = [
    { id: 1, name: "Laptop HP", price: 1200 },
    { id: 2, name: "Mouse Inalámbrico", price: 25 },
    { id: 3, name: "Teclado Mecánico", price: 80 }
];

// Elementos del DOM
const productList = document.getElementById('productList');
const adminToggle = document.getElementById('adminToggle');
const editModal = new bootstrap.Modal('#editModal');
let currentProductId = null;

// Mostrar productos
function renderProducts() {
    productList.innerHTML = products.map(product => `
        <div class="col">
            <div class="card product-card h-100">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price.toFixed(2)}</p>
                    
                    <!-- Botones de acción -->
                    <div class="d-flex gap-2">
                        <button onclick="openEditModal(${product.id})" 
                                class="btn btn-warning btn-action">
                            <i class="bi bi-pencil"></i> Actualizar
                        </button>
                        <button onclick="deleteProduct(${product.id})" 
                                class="btn btn-danger btn-action">
                            <i class="bi bi-trash"></i> Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Abrir modal de edición
function openEditModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    currentProductId = id;
    document.getElementById('editId').value = id;
    document.getElementById('editName').value = product.name;
    document.getElementById('editPrice').value = product.price;
    editModal.show();
}

// Guardar cambios
document.getElementById('confirmEdit').addEventListener('click', () => {
    const name = document.getElementById('editName').value;
    const price = parseFloat(document.getElementById('editPrice').value);

    if (name && !isNaN(price)) {
        const index = products.findIndex(p => p.id === currentProductId);
        if (index !== -1) {
            products[index] = { ...products[index], name, price };
            renderProducts();
            editModal.hide();
        }
    }
});

// Eliminar producto
function deleteProduct(id) {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
        products = products.filter(product => product.id !== id);
        renderProducts();
    }
}

// Toggle modo admin (ejemplo adicional)
adminToggle.addEventListener('click', () => {
    alert("Modo administrador activado");
    // Aquí podrías mostrar funcionalidades extra
});

// Inicializar
document.addEventListener('DOMContentLoaded', renderProducts);