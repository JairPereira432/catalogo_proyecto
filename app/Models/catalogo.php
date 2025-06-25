<?php
require 'conexion.php';

// Consulta para obtener todos los productos
$sql = "SELECT * FROM productos";
$resultado = $conexion->query($sql);

// Verificar si hay resultados
if ($resultado->num_rows > 0) {
    $productos = $resultado->fetch_all(MYSQLI_ASSOC);
} else {
    $productos = [];
}

$conexion->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catálogo de Productos | JMR ONLINE PRODUCTS</title>
    <style>
        .productos-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            padding: 20px;
        }
        .producto {
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 8px;
        }
        .producto img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <?php include 'header.php'; // Asegúrate de tener este archivo con tu menú ?>
    
    <h1 style="text-align: center; margin: 20px 0;">Catálogo de Productos</h1>
    
    <div class="productos-container">
        <?php if (!empty($productos)): ?>
            <?php foreach ($productos as $producto): ?>
                <div class="producto">
                    <img src="<?php echo htmlspecialchars($producto['imagen']); ?>" 
                         alt="<?php echo htmlspecialchars($producto['nombre']); ?>">
                    <h3><?php echo htmlspecialchars($producto['nombre']); ?></h3>
                    <p><?php echo htmlspecialchars($producto['descripcion']); ?></p>
                    <p><strong>Precio: $<?php echo number_format($producto['precio'], 2); ?></strong></p>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <p style="grid-column: 1 / -1; text-align: center;">No hay productos disponibles.</p>
        <?php endif; ?>
    </div>
    
    <?php include 'footer.php'; // Pie de página ?>
</body>
</html>