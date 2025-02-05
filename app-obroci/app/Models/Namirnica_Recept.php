<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Namirnica_Recept extends Model
{
    /** @use HasFactory<\Database\Factories\NamirnicaReceptFactory> */
    use HasFactory;

    protected $primaryKey = null;
    public $incrementing = false;

    protected $table = 'namirnica_recept';
    protected $fillable =
    [
        'recept_id',
        'namirnica_id',
        'kolicina',
    ];

    public function namirnica()
    {
        return $this->belongsTo(Namirnica::class, 'namirnica_id');
    }

    public function recept()
    {
        return $this->belongsTo(Recept::class, 'recept_id');
    }
    
    protected function setKeysForSaveQuery($query)
    {
        return $query->where('namirnica_id', $this->getAttribute('namirnica_id'))
                     ->where('recept_id', $this->getAttribute('recept_id'));
    }
}
