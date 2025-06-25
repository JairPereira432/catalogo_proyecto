<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categoria;
use App\Models\Producto;

class CategoriaProductoSeeder extends Seeder
{
    public function run(): void
    {
        // Crear categorías usando firstOrCreate
        $categorias = [
            ['nombre' => 'Electrónica', 'slug' => 'electronica'],
            ['nombre' => 'Ropa', 'slug' => 'ropa'],
            ['nombre' => 'Hogar', 'slug' => 'hogar'],
        ];

        foreach ($categorias as $catData) {
            Categoria::firstOrCreate(
                ['slug' => $catData['slug']],
                $catData
            );
        }

        // Crear productos
        $productos = [
            [
                'nombre' => 'Laptop',
                'descripcion' => 'Laptop de alto rendimiento',
                'precio' => 1200.50,
                'imagen' => ' https://firebasestorage.googleapis.com/v0/b/catalogo-7a546.firebasestorage.app/o/laptop%20ultra.jpg?alt=media&token=b2eec752-6a0c-4ee0-906a-e8c5a89bed0c',
                'stock' => 10,
            ],
            [
                'nombre' => 'Camisa Casual',
                'descripcion' => 'Camisa de algodón',
                'precio' => 25.99,
                'imagen' => 'https://firebasestorage.googleapis.com/v0/b/store-3ab01.firebasestorage.app/o/imagenes%2Fcamisa.jpg?alt=media&token=28ffec83-3081-498b-b78a-d531c8708e68',
                'stock' => 50,
            ],
            [
                'nombre' => 'Sofá Moderno',
                'descripcion' => 'Sofá de diseño cómodo',
                'precio' => 499.99,
                'imagen' => 'https://firebasestorage.googleapis.com/v0/b/store-3ab01.firebasestorage.app/o/imagenes%2Fsofa.jpeg?alt=media&token=f1c57d09-e917-4d2c-92bd-3a47548c66bb',
                'stock' => 5,
            ],
            [
                'nombre' => 'Mesa de Comedor',
                'descripcion' => 'Mesa de madera maciza para 6 personas',
                'precio' => 799.99,
                'imagen' => 'https://firebasestorage.googleapis.com/v0/b/store-3ab01.firebasestorage.app/o/imagenes%2Fmesa.webp?alt=media&token=b309c8fc-a6b7-4731-bc6b-8c44f7d42686',
                'stock' => 3,
            ],
            [
                'nombre' => 'Silla Ergonómica',
                'descripcion' => 'Silla de oficina ajustable con soporte lumbar',
                'precio' => 259.99,
                'imagen' => 'https://firebasestorage.googleapis.com/v0/b/store-3ab01.firebasestorage.app/o/imagenes%2Fsilla.jpg?alt=media&token=0876ff1f-c301-4220-8482-9b94f5b3446a',
                'stock' => 8,
            ],
            [
                'nombre' => 'Lámpara de Pie',
                'descripcion' => 'Lámpara de pie con luz cálida y diseño moderno',
                'precio' => 129.99,
                'imagen' => 'https://firebasestorage.googleapis.com/v0/b/store-3ab01.firebasestorage.app/o/imagenes%2Flampara.jpeg?alt=media&token=6866bfbf-4c00-4872-9d80-7ecce0fbc70c',
                'stock' => 10,
            ],
            [
                'nombre' => 'Estantería de Pared',
                'descripcion' => 'Estantería flotante ideal para libros o decoración',
                'precio' => 89.99,
                'imagen' => 'https://firebasestorage.googleapis.com/v0/b/store-3ab01.firebasestorage.app/o/imagenes%2Festante.jpeg?alt=media&token=3c8d4043-fd02-437b-a67f-ddbc329f2417',
                'stock' => 12,
            ],
            [
                'nombre' => 'Cama Queen Size',
                'descripcion' => 'Cama tamaño queen con cabecera tapizada',
                'precio' => 999.99,
                'imagen' => 'https://firebasestorage.googleapis.com/v0/b/store-3ab01.firebasestorage.app/o/imagenes%2Fcama.jpg?alt=media&token=d4bb1ea9-beb9-4991-baf8-63b01861a8ed',
                'stock' => 2,
            ],
            [
                'nombre' => 'Alfombra Decorativa',
                'descripcion' => 'Alfombra suave de estilo bohemio 200x150 cm',
                'precio' => 149.99,
                'imagen' => 'https://firebasestorage.googleapis.com/v0/b/store-3ab01.firebasestorage.app/o/imagenes%2Fcarpet.jpeg?alt=media&token=3bbd521d-ac3f-4dab-b022-02b03cc1c326',
                'stock' => 6,
            ],

        ];

        foreach ($productos as $prodData) {
            $producto = Producto::updateOrCreate(
                ['nombre' => $prodData['nombre']],
                $prodData
            );

            // Asignar categorías aleatorias
            $categoriaIds = Categoria::inRandomOrder()->limit(rand(1, 2))->pluck('id')->toArray();
            $producto->categorias()->sync($categoriaIds);
        }
    }
}