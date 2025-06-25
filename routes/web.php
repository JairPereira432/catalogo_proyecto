<?php

use App\Http\Controllers\ProductoController;
use App\Models\Producto;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

//Asociar url y metodos http GET POST PUT DELETE a un controlador
Route::resource('productos', ProductoController::class);