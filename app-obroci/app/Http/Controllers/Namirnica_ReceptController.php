<?php

namespace App\Http\Controllers;

use App\Models\Namirnica_Recept;
use App\Http\Controllers\Controller;
use App\Http\Resources\Namirnica_ReceptResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;

class Namirnica_ReceptController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $nam_rec = Namirnica_Recept::all();
        return Namirnica_ReceptResource::collection($nam_rec);
    }

    public function showRecept($recept_id)
    {
        $nr = Namirnica_Recept::with('recept')->where('recept_id', $recept_id)->get();

        if ($nr->isEmpty()) {
            return response()->json(['Greska:' => 'Nema namirnica za ovaj recept.'], 404);
        }

        return Namirnica_ReceptResource::collection($nr);
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
            'namirnica_id' => 'required|exists:namirnice,id',
            'recept_id' => 'required|exists:recepti,id',
            'kolicina' => 'required|integer|min:1'
        ]);
    
        if ($validator->fails()) 
        {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        try 
        {
            $namirnica_recept = Namirnica_Recept::create([
                'namirnica_id' => $request->namirnica_id,
                'recept_id' => $request->recept_id,
                'kolicina' => $request->kolicina
            ]);
    
            return response()->json(['message' => 'Namirnica recepta je uspesno dodata.', 'data' => new Namirnica_ReceptResource($namirnica_recept)], 201);
        } 
        catch (QueryException $e) 
        {
            if ($e->getCode() === '23000') 
            {
                return response()->json(['error' => 'Ova namirnica vec postoji za recept.'], 409);
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
    public function edit(Request $request, $idRecept, $idNamirnica)
    {
        $validator = Validator::make($request->all(), [
            'kolicina' => 'required|integer|min:1'
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        $namirnica_recept = Namirnica_Recept::where('namirnica_id', $idNamirnica)
                                            ->where('recept_id', $idRecept)
                                            ->first();
    
        if (!$namirnica_recept) {
            return response()->json(['error' => 'Namirnica recepta nije pronađena.'], 404);
        }
    
        $namirnica_recept->update([
            'kolicina' => $request->kolicina
        ]);
    
        return response()->json([
            'message' => 'Namirnica recepta je uspešno izmenjena.', 
            'namirnica_recept' => $namirnica_recept
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $idRecept, $idNamirnica)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($idRecept, $idNamirnica)
    {
        $brojObrisanihRedova = Namirnica_Recept::where('namirnica_id', $idNamirnica)->
        where('recept_id', $idRecept)->delete();

        if ($brojObrisanihRedova > 0) 
            return response()->json(['message' => 'Namirnica recepta je uspesno obrisana.']);
        else 
            return response()->json(['message' => 'Nije pronadjena namirnica recepta za brisanje.'], 404);
    }
}
