<?php

namespace App\Http\Controllers;

use App\Models\Alergija;
use App\Http\Controllers\Controller;
use App\Http\Resources\AlergijaResource;
use Illuminate\Http\Request;

class AlergijeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $alergije = Alergija::all();
        return AlergijaResource::collection($alergije);
    }
   
    public function showKorisnik($korisnik_id)
    {
        $alergije = Alergija::with('korisnik')->where('korisnik_id', $korisnik_id)->get();

        if ($alergije->isEmpty()) {
            return response()->json(['Greska:' => 'Nema alergija za ovog korisnika.'], 404);
        }

        return AlergijaResource::collection($alergije);
    }
   
   

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Alergija $alergija)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Alergija $alergija)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Alergija $alergija)
    {
        //
    }
}
