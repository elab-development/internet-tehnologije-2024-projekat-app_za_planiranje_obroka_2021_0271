<?php

namespace App\Http\Controllers;

use App\Models\Obrok;
use App\Http\Controllers\Controller;
use App\Http\Resources\ObrokResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ObrokContoller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Obrok::query();
        if ($request->has('datum')) {
            $query->whereDate('datum', $request->datum);
        }
    
        
        if ($request->has('datum_od') && $request->has('datum_do')) {
            $query->whereBetween('datum', [$request->datum_od, $request->datum_do]);
        }
    

        $obroci = $query->paginate($request->get('per_page', 10));
        return ObrokResource::collection($obroci);
    }

    public function show($obrok_id)
    {
        $obrok = Obrok::find($obrok_id);
        if(is_null($obrok)){
            return response()->json('Obrok nije pronadjen', 404 );
        }
        return new ObrokResource($obrok);
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
            'datum' => 'required|date',  
            'tip' => 'required|string|in:dorucak,rucak,uzina,vecera', 
            'korisnik_id' => 'required|exists:korisnici,id',
            'recept_id' => 'required|exists:recepti,id'
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        $obrok = Obrok::create([
            'datum' => $request->datum,
            'tip' => $request->tip,
            'korisnik_id' => $request->korisnik_id,
            'recept_id' => $request->recept_id
        ]);
    
        return response()->json([
            'message' => 'Obrok je uspešno dodat.',
            'obrok' => new ObrokResource($obrok)
        ]);
    }

    /**
     * Display the specified resource.
     */
   

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Obrok $obrok)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $obrok = Obrok::findOrFail($id);

    Log::info('Updating obrok:', ['obrok' => $obrok]);

    $validator = Validator::make($request->all(), [
        'datum' => 'required|date',  
        'tip' => 'required|string|in:dorucak,rucak,uzina,vecera',
        'korisnik_id' => 'required|exists:korisnici,id',
        'recept_id' => 'required|exists:recepti,id'
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $obrok->datum = $request->datum;
    $obrok->tip = $request->tip;
    $obrok->korisnik_id = $request->korisnik_id;
    $obrok->recept_id = $request->recept_id;

    $obrok->save();

    return response()->json([
        'message' => 'Obrok je uspesno izmenjen.',
        'obrok' => $obrok
    ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $obrok = Obrok::findOrFail($id);

        $obrok->delete();

        return response()->json(['Obrok je uspesno obrisan.']);
    }
}
