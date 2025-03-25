<?php

namespace App\Http\Controllers;

use App\Models\Alergija;
use App\Http\Controllers\Controller;
use App\Http\Resources\AlergijaResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;

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
        $validator = Validator::make($request->all(), [
            'korisnik_id' => 'required|exists:korisnici,id',
            'namirnica_id' => 'required|exists:namirnice,id',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        try {
            $alergija = Alergija::create([
                'korisnik_id' => $request->korisnik_id,
                'namirnica_id' => $request->namirnica_id,
            ]);
    
            return response()->json(['message' => 'Korisnikova alergija je uspesno dodata.', 'data' => new AlergijaResource($alergija)], 201);

            } catch (QueryException $e) 
            {
            if ($e->getCode() === '23000') 
            {
                return response()->json(['error' => 'Alergija vec postoji za korisnika.'], 409);
            }
    
            return response()->json(['error' => 'Doslo je do greške prilikom čuvanja podataka.'], 500);
        }
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
    public function destroy($idKorisnik, $idNamirnice)
    {
        $brojObrisanihRedova = Alergija::where('korisnik_id', $idKorisnik)->
        where('namirnica_id', $idNamirnice)->delete();

        if ($brojObrisanihRedova > 0) 
            return response()->json(['message' => 'Korisnikova alergija je uspesno obrisana.']);
        else 
            return response()->json(['message' => 'Nije pronadjena korisnikova alergija za brisanje.'], 404);
    }


    public function destroyAllForKorisnik($idKorisnik)
    {
        // Brisanje svih preferencija za korisnika
        $brojObrisanihRedova = Alergija::where('korisnik_id', $idKorisnik)->delete();
    
        // Proveravamo da li je bilo obrisanih redova
        if ($brojObrisanihRedova > 0) {
            return response()->json(['message' => 'Sve alergije za korisnika su uspešno obrisane.']);
        } else {
            return response()->json(['message' => 'Nema alergija za ovog korisnika.'], 404);
        }
    }
}
