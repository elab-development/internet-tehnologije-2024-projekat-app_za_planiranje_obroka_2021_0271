<?php

namespace App\Http\Controllers;

use App\Models\Korisnik_Preferencije;
use App\Http\Controllers\Controller;
use App\Http\Resources\Korisnik_PreferencijeResource;
use Illuminate\Http\Request;

class Korisnik_PreferencijeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $korisnik_preferencije = Korisnik_Preferencije::all();
        return Korisnik_PreferencijeResource::collection($korisnik_preferencije);
    }

    public function showKorisnik($korisnik_id)
    {
        $kp = Korisnik_Preferencije::with('korisnik')->where('korisnik_id', $korisnik_id)->get();

        if ($kp->isEmpty()) {
            return response()->json(['Greska:' => 'Nema preferencija za ovog korisnika.'], 404);
        }

        return Korisnik_PreferencijeResource::collection($kp);
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
    public function edit(Korisnik_Preferencije $korisnik_Preferencije)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Korisnik_Preferencije $korisnik_Preferencije)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Korisnik_Preferencije $korisnik_Preferencije)
    {
        //
    }
}
