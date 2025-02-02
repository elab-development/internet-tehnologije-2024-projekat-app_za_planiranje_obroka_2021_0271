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
use Illuminate\Support\Facades\Route;

Route::resource('korisnici',KorisnikContoller::class); 
Route::resource('namirnice',NamirnicaContoller::class); 

Route::resource('recepti',ReceptController::class);
Route::resource('preferencije',PreferencijeController::class);

Route::get('/alergije', [AlergijeController::class,'index']);
Route::get('/korisnici/{id}/alergije', [AlergijeController::class,'showKorisnik']);
Route::get('/korisnici/{id}/preferencije', [Korisnik_PreferencijeController::class,'showKorisnik']);
Route::get('/recepti/{id}/namirnice', [Namirnica_ReceptController::class,'showRecept']);
Route::post('/register',[AuthController::class, 'register']);
Route::post('/login',[AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function(){
    Route::resource('obroci',ObrokContoller::class);
    Route::post('/logout', [AuthController::class, 'logout']);
});


Route::middleware(['auth:sanctum', AdminMiddleware::class])->group(function () {
    Route::get('/admin/dashboard', function () {
        return response()->json(['message' => 'Dobrodosli, Admine!']);
    });

    Route::patch('/korisnici/{id}/uloga', [AdminController::class, 'updateUserRole']);

});



//Route::resource('alergije', AlergijeController::class);

//;



// Route::get('/korisnici', [KorisnikContoller::class,'index']);
// Route::get('/korisnici/{id}', [KorisnikContoller::class,'show']);


