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
        
        $query->orderBy('ime', 'asc')->orderBy('prezime', 'asc');
        
        //$korisnici = $query->paginate($request->get('per_page', 10));

        $korisnici = $query->get();
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
    public function update(Request $request, $id)
{
  
    $validated = $request->validate([
        'ime' => 'required|string|max:50',
        'prezime' => 'required|string|max:50',
        'email' => 'required|string|max:50|email',
        'korisnicko_ime' => 'required|string|min:10|max:50',
    ]);

    
    $korisnik = Korisnik::find($id);

    if (is_null($korisnik)) {
        return response()->json('Korisnik nije pronađen', 404);
    }

   
    $korisnik->ime = $validated['ime'];
    $korisnik->prezime = $validated['prezime'];
    $korisnik->email = $validated['email'];
    $korisnik->korisnicko_ime = $validated['korisnicko_ime'];
  
    $korisnik->save();
    return new KorisnikResource($korisnik);
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
