<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Namirnica extends Model
{
    protected $table = 'namirnice';
    protected $fillable =[
        'naziv',
        'broj_kalorija',
        'proteini',
        'masti',
        'ugljeni_hidrati'
    ];

    use HasFactory;
}
