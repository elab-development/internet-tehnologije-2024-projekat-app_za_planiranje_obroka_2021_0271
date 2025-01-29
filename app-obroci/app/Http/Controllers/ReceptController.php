<?php

namespace App\Http\Controllers;

use App\Models\Recept;
use App\Http\Controllers\Controller;
use App\Http\Resources\ReceptResource;
use Illuminate\Http\Request;

class ReceptController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
            $recepti = Recept::all();
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
        //
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
    public function update(Request $request, Recept $recept)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Recept $recept)
    {
        //
    }
}
