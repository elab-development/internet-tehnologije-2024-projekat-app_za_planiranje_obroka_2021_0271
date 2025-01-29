<?php

namespace App\Http\Controllers;

use App\Models\Obrok;
use App\Http\Controllers\Controller;
use App\Http\Resources\ObrokResource;
use Illuminate\Http\Request;

class ObrokContoller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $obroci = Obrok::all();
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
        //
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
    public function update(Request $request, Obrok $obrok)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Obrok $obrok)
    {
        //
    }
}
