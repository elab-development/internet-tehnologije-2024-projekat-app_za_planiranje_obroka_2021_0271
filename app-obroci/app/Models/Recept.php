<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recept extends Model
{
    protected $table = 'recepti';
    protected $fillable = [
        'naziv',
        'opis',
        'veganski',
        'vegetarijanski',
        'bez_laktoze',
        'bez_glutena',
        'posno'
    ];
    
    use HasFactory;

    function obroci(){
        return $this->hasMany(Obrok::class);
    }

    public function namirnice()
    {
        return $this->belongsToMany(Namirnica::class, 'namirnica_recept', 'recept_id', 'namirnica_id')->withPivot('kolicina'); 
    }
}
