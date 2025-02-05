<?php

namespace App\Http\Controllers;

use App\Models\Korisnik;
use App\Http\Controllers\Controller;
use App\Http\Resources\KorisnikCollection;
use App\Http\Resources\KorisnikResource;
use Illuminate\Http\Request;

class KorisnikContoller extends Controller
{
    /**
     * Display a listing of the resource.
     */

    

    public function index()
    {
        $korisnici = Korisnik::all();
        if(is_null($korisnici)){
            return response()->json('Korisnici nisu pronadjeni', 404 );
        }
        return new KorisnikCollection($korisnici);
    }

   

    /**
     * Display the specified resource.
     */
 
    
     public function show($korisnik_id)
    {
        $korisnik = Korisnik::find($korisnik_id);
        if(is_null($korisnik)){
            return response()->json('Korisnik nije pronadjen', 404 );
        }
        return new KorisnikResource($korisnik);

    }

     /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Korisnik $korisnik)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Korisnik $korisnik)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $korisnik = Korisnik::findOrFail($id);

        $korisnik->delete();

        return response()->json(['Korisnik je uspesno obrisan.']);
    }
}
