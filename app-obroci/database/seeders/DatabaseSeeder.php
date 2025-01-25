<?php

namespace Database\Seeders;

use App\Models\Alergija;
use App\Models\Korisnik;
use App\Models\Korisnik_Preferencije;
use App\Models\Namirnica;
use App\Models\Namirnica_Recept;
use App\Models\Obrok;
use App\Models\Preferencije;
use App\Models\Recept;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');


        DB::table('korisnici')->truncate();
        DB::table('namirnice')->truncate();
        DB::table('recepti')->truncate();
        DB::table('obroci')->truncate();
        DB::table('preferencije')->truncate();

        DB::table('alergije')->truncate();
        DB::table('korisnik_preferencije')->truncate();
        DB::table('namirnica_recept')->truncate();


        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        
        
        $korisnik = Korisnik::factory()->create();
        $namirnica = Namirnica::factory()->create();
        $preferencija = Preferencije::factory()->create();
        $recept = Recept::factory()->create();
        $obroci = Obrok::factory()->create();

        $alergije = Alergija::factory()->create();
        $korisnik_preferencije = Korisnik_Preferencije::factory()->create();
        $namirnica_recept = Namirnica_Recept::factory()->create();
    }
}
