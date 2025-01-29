<?php

namespace App\Http\Controllers;

use App\Models\Preferencije;
use App\Http\Controllers\Controller;
use App\Http\Resources\PreferencijeResource;
use Illuminate\Http\Request;

class PreferencijeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $preferencije = Preferencije::all();
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
        //
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
    public function update(Request $request, Preferencije $preferencije)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Preferencije $preferencije)
    {
        //
    }
}
