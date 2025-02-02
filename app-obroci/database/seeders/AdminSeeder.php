<?php

namespace Database\Seeders;

use App\Models\Korisnik;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Korisnik::updateOrCreate(
            [
                'ime' => 'Jovan',
                'prezime' => 'Jovic',
                'korisnicko_ime'=> 'admin_jovan',
                'email' => 'jovan@gmail.com',
                'sifra' => Hash::make('admin'),
                'uloga' => 'admin'
            ]
            );
    }
}
