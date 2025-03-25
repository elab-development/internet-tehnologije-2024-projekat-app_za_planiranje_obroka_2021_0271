<?php

namespace App\Http\Controllers;

use App\Models\Recept;
use App\Http\Controllers\Controller;
use App\Http\Resources\ReceptResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ReceptController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    
    public function index(Request $request)
    {
        $query = Recept::query();

         
        if ($request->has('veganski')) {
            $query->where('veganski', (bool) $request->veganski);
        }
        if ($request->has('posno')) {
            $query->where('posno', (bool) $request->posno);
        }
        if ($request->has('vegetarijanski')) {
            $query->where('vegetarijanski', (bool) $request->vegetarijanski);
        }
        if ($request->has('bez_laktoze')) {
            $query->where('bez_laktoze', (bool) $request->bez_laktoze);
        }
        if ($request->has('bez_glutena')) {
            $query->where('bez_glutena', (bool) $request->bez_glutena);
        }

        if ($request->has('naziv')) {
        $query->where('naziv', 'like', '%' . $request->naziv . '%');
        }

    
    $recepti = $query->paginate($request->get('per_page', 10));
    return ReceptResource::collection($recepti);
        
    }

    public function show($recept_id)
    {
        $recept = Recept::find($recept_id);
        if(is_null($recept)){
            return response()->json('Recept nije pronadjen', 404 );
        }
        return new ReceptResource($recept);
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
            'naziv' => 'required|string|max:255',
            'opis' => 'required|string|max:1000',
            'veganski' => 'required|boolean',
            'vegetarijanski' => 'required|boolean',
            'bez_laktoze' => 'required|boolean',
            'bez_glutena' => 'required|boolean',
            'posno' => 'required|boolean',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
    
        $recept = Recept::create([

            'naziv' => $request->naziv,
            'opis' => $request->opis,
            'veganski' => $request->veganski,
            'vegetarijanski' => $request->vegetarijanski,
            'bez_laktoze' => $request->bez_laktoze,
            'bez_glutena' => $request->bez_glutena,
            'posno' => $request->posno,
        ]);
    
        return response()->json(['Recept je uspesno dodat.', new ReceptResource($recept)]);
    }

    /**
     * Display the specified resource.
     */
    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Recept $recept)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $recept = Recept::findOrFail($id);

        Log::info('Updating recept:', ['recept' => $recept]);

        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:255',
            'opis' => 'required|string|max:1000',
            'veganski' => 'required|boolean',
            'vegetarijanski' => 'required|boolean',
            'bez_laktoze' => 'required|boolean',
            'bez_glutena' => 'required|boolean',
            'posno' => 'required|boolean',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        $recept->naziv = $request->naziv;
        $recept->opis = $request->opis;
        $recept->veganski = $request->veganski;
        $recept->vegetarijanski = $request->vegetarijanski;
        $recept->bez_laktoze = $request->bez_laktoze;
        $recept->bez_glutena = $request->bez_glutena;
        $recept->posno = $request->posno;
        
        $recept->save();
    
        return response()->json(['message' => 'Recept je uspešno izmenjen.', 'recept' => $recept]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $recept = Recept::findOrFail($id);

        $recept->delete();

        return response()->json(['Recept je uspesno obrisan.']);
    }


    public function pretrazi(Request $request)
{
    $korisnik = Auth::user();

    if (!$korisnik) {
        return response()->json(['error' => 'Niste prijavljeni.'], 401);
    }

    $query = Recept::query();

    $alergije = $korisnik->alergije->pluck('id')->toArray();

    if (!empty($alergije)) {
        $query->whereDoesntHave('namirnice', function ($q) use ($alergije) {
            $q->whereIn('namirnica_id', $alergije);
        });
    }

    $preferencije = $korisnik->preferencije->pluck('naziv')->map(function ($item) {
        return str_replace(' ', '_', $item);
    })->toArray();

    if (!empty($preferencije)) {
        foreach ($preferencije as $preferencija) {
            $query->where($preferencija, true);
        }
    }

    $recepti = $query->get();
    return response()->json($recepti);
}
}
