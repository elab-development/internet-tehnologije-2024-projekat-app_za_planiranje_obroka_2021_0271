<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AlergijeController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\Korisnik_PreferencijeController;
use App\Http\Controllers\KorisnikContoller;
use App\Http\Controllers\Namirnica_ReceptController;
use App\Http\Controllers\NamirnicaContoller;
use App\Http\Controllers\ObrokContoller;
use App\Http\Controllers\PreferencijeController;
use App\Http\Controllers\ReceptController;
use App\Http\Middleware\AdminMiddleware;
use App\Models\Alergija;
use App\Models\Namirnica_Recept;
use App\Models\Obrok;
use App\Models\Recept;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;


Route::get('/alergije', [AlergijeController::class,'index']);
Route::get('/korisnici/{id}/alergije', [AlergijeController::class,'showKorisnik']);
Route::get('/korisnici/{id}/preferencije', [Korisnik_PreferencijeController::class,'showKorisnik']);
Route::get('/recepti/{id}/namirnice', [Namirnica_ReceptController::class,'showRecept']);
Route::post('/register',[AuthController::class, 'register']);
Route::post('/login',[AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::resource('recepti',ReceptController::class);
//Dodali smo novo
Route::resource('preferencije', PreferencijeController::class)->only(['index']);
//prebacili smo iznad ovu rutu

Route::group(['middleware' => ['auth:sanctum']], function(){
    Route::resource('obroci',ObrokContoller::class);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::delete('/korisnici/{idKorisnik}/preferencije', [Korisnik_PreferencijeController::class, 'destroyAllForKorisnik']);
    
    Route::delete('/korisnici/{id}/alergije', [AlergijeController::class, 'destroyAllForKorisnik']);
    
    Route::resource('namirnice',NamirnicaContoller::class);
    Route::post('/korisnik_preferencije', [Korisnik_PreferencijeController::class,'store']);
    
    Route::post('/alergije', [AlergijeController::class,'store']);
    Route::post('/namirnica_recept', [Namirnica_ReceptController::class,'store']);
    Route::patch('/recepti/{idRecept}/namirnice/{idNamirnica}', [Namirnica_ReceptController::class,'edit']);
    Route::delete('/korisnici/{idKorisnik}/preferencije/{idPreferencija}', [Korisnik_PreferencijeController::class, 'destroy']);
    Route::delete('/korisnici/{idKorisnik}/namirnice/{idNamirnica}', [AlergijeController::class, 'destroy']);
    Route::delete('/recepti/{idRecept}/namirnice/{idNamirnica}', [Namirnica_ReceptController::class, 'destroy']);
    Route::get('/pretrazi-recepte', [ReceptController::class, 'pretrazi']);
    Route::resource('korisnici',KorisnikContoller::class)->only(['show','update']);
});


Route::middleware(['auth:sanctum', AdminMiddleware::class])->group(function () {
    // Route::get('/admin/dashboard', function () {
    //     return response()->json(['message' => 'Dobrodosli, Admine!']);
    // });
    Route::resource('korisnici',KorisnikContoller::class)->only(['index','destroy']);
    Route::patch('/korisnici/{id}/uloga', [AdminController::class, 'updateUserRole']);
    //Preferncije kod admina treba da se dodaju (sta sve moze da radi sa njima)
    //Route::resource('preferencije', PreferencijeController::class);
    
    //Treba da se doda only, pa sve ostalo osim index. Za rutu korisnici
    
    //Route::resource('korisnici',KorisnikContoller::class);
});


//Javni servis
Route::get('/nutritivne-vrednosti/{namirnica}', [NamirnicaContoller::class, 'uzmiNutritivneVrednostiAPI']);



//Route::resource('alergije', AlergijeController::class);

//;



// Route::get('/korisnici', [KorisnikContoller::class,'index']);
// Route::get('/korisnici/{id}', [KorisnikContoller::class,'show']);


