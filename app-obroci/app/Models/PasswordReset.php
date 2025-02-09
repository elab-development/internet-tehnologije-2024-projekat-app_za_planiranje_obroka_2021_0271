<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PasswordReset extends Model
{
    use HasFactory;

    protected $table = 'password_resets';

    protected $fillable = ['email', 'token', 'sifra']; 

    protected $primaryKey = 'id'; 

    public $timestamps = false;
}
