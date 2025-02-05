<?php

namespace App\Http\Controllers;

use App\Models\Korisnik_Preferencije;
use App\Http\Controllers\Controller;
use App\Http\Resources\Korisnik_PreferencijeResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;

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
        $validator = Validator::make($request->all(), [
            'korisnik_id' => 'required|exists:korisnici,id',
            'preferencija_id' => 'required|exists:preferencije,id',
        ]);
    
        if ($validator->fails()) 
        {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        try 
        {
            $korisnik_preferencije = Korisnik_Preferencije::create([
                'korisnik_id' => $request->korisnik_id,
                'preferencija_id' => $request->preferencija_id,
            ]);
    
            return response()->json(['message' => 'Korisnikova preferencija je uspesno dodata.', 'data' => new Korisnik_PreferencijeResource($korisnik_preferencije)], 201);
        } 
        catch (QueryException $e) 
        {
            if ($e->getCode() === '23000') 
            {
                return response()->json(['error' => 'Ova preferencija vec postoji za korisnika.'], 409);
            }
    
            return response()->json(['error' => 'Doslo je do greske prilikom cuvanja podataka.'], 500);
        }
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
    public function destroy($idKorisnik, $idPreferencije)
    {
        $brojObrisanihRedova = Korisnik_Preferencije::where('korisnik_id', $idKorisnik)->
        where('preferencija_id', $idPreferencije)->delete();

        if ($brojObrisanihRedova > 0) 
            return response()->json(['message' => 'Korisnikova preferencija je uspesno obrisana.']);
        else 
            return response()->json(['message' => 'Nije pronadjena preferencija za brisanje.'], 404);
    }
}
