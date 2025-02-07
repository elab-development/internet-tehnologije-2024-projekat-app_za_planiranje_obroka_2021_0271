<?php

namespace App\Http\Controllers;

use App\Models\Preferencije;
use App\Http\Controllers\Controller;
use App\Http\Resources\PreferencijeResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class PreferencijeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Preferencije::query();

    
        if ($request->has('naziv')) {
        $query->where('naziv', 'like', '%' . $request->naziv . '%');
        }

   
        $preferencije = $query->paginate($request->get('per_page', 10));

        return PreferencijeResource::collection($preferencije);
    }

    public function show($preferencija_id)
    {
        $prefencija = Preferencije::find($preferencija_id);
        if(is_null($prefencija)){
            return response()->json('Preferencija nije pronadjena', 404 );
        }
        return new PreferencijeResource($prefencija);
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
            'naziv' => 'required|string|max:255|in:veganski,vegetarijanski,bez_laktoze,bez_glutena,posno|unique:preferencije'
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
    
        $preferencija = Preferencije::create([
            'naziv' => $request->naziv
        ]);
    
        return response()->json(['Preferencija je uspesno dodata.', new PreferencijeResource($preferencija)]);
    }

    /**
     * Display the specified resource.
     */
   

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Preferencije $preferencije)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $preferencija = Preferencije::findOrFail($id); 

        Log::info('Updating preferencija:', ['preferencija' => $preferencija]);

        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:255|in:veganski,vegetarijanski,bez_laktoze,bez_glutena,posno|unique:preferencije',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        $preferencija->naziv = $request->naziv;
        
        $preferencija->save();
    
        return response()->json(['message' => 'Preferencija je uspesno izmenjena.', 'preferencija' => $preferencija]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $preferencije = Preferencije::findOrFail($id);

        $preferencije->delete();

        return response()->json(['Preferencija je uspesno obrisana.']);
    }
}
