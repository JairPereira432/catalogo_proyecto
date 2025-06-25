<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    protected $fillable = [
        'users_id',
        'direccion_id',
        'total',
        'estado',
        'fecha_pedido',
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }
    public function direccion()
    {
        return $this->belongsTo(Direccion::class, 'direccion_id');
    }
    public function pedidoProductos()
    {
        return $this->hasMany(PedidoProducto::class);
    }
}