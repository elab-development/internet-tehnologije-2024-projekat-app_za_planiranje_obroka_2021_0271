<?php

namespace App\Http\Controllers;

use App\Models\Namirnica_Recept;
use App\Http\Controllers\Controller;
use App\Http\Resources\Namirnica_ReceptResource;
use Illuminate\Http\Request;

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
        //
    }

    /**
     * Display the specified resource.
     */
    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Namirnica_Recept $namirnica_Recept)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Namirnica_Recept $namirnica_Recept)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Namirnica_Recept $namirnica_Recept)
    {
        //
    }
}
