<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'nombre', 'descripcion', 'fecha_inicial', 'fecha_final','evento_tabla'
    ];

    public $timestamps = false;

    protected $table = 'eventos';
}
