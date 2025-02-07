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

    

    public function index(Request $request)
    {
        $query = Korisnik::query();

        // Filtriranje po imenu
        if ($request->has('ime')) {
            $query->where('ime', 'like', '%' . $request->ime . '%');
        }
    
        // Filtriranje po prezimenu
        if ($request->has('prezime')) {
            $query->where('prezime', 'like', '%' . $request->prezime . '%');
        }
    
        // Filtriranje po korisničkom imenu
        if ($request->has('korisnicko_ime')) {
            $query->where('korisnicko_ime', 'like', '%' . $request->korisnicko_ime . '%');
        }
    
        // Filtriranje po email-u
        if ($request->has('email')) {
            $query->where('email', 'like', '%' . $request->email . '%');
        }
    
        // Paginacija (podrazumevano 10 po strani, ali može se menjati parametrom per_page)
        $korisnici = $query->paginate($request->get('per_page', 10));

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
