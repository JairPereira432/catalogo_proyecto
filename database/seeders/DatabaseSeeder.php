<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CategoriaProductoSeeder::class,
            UsuarioDireccionSeeder::class,
            // Puedes agregar más seeders aquí si es necesario
        ]);
        // \App\Models\User::factory(10)->create();
        // \App\Models\Producto::factory(10)->create();
        // \App\Models\Categoria::factory(10)->create();
        // \App\Models\CategoriaProducto::factory(10)->create();
    }
}