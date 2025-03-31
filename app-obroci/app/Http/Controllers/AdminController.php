<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Korisnik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function updateUserRole(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'uloga' => 'required|in:admin,korisnik', 
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'Greska u validaciji:' => $validator->errors()
            ], 400);
        }

    $korisnik = Korisnik::find($id);
    if (!$korisnik) {
        return response()->json([
            'Greska:' => 'Korisnik nije pronađen'
        ], 404);
    }

    $korisnik->uloga = $request->uloga;
    $korisnik->save();

    return response()->json([
        'Poruka:' => 'Uloga korisnika je uspešno ažurirana'
    ], 200);
    
    
    }
}
