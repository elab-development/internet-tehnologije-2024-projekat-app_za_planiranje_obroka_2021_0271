<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alergija extends Model
{
    /** @use HasFactory<\Database\Factories\AlergijaFactory> */
    use HasFactory;
    
    protected $table = 'alergije';
    protected $fillable =
    [
        'korisnik_id',
        'namirnica_id'
    ];

    public function korisnik()
    {
        return $this->belongsTo(Korisnik::class, 'korisnik_id');
    }

    public function namirnica()
    {
        return $this->belongsTo(Namirnica::class, 'namirnica_id');
    }
}
