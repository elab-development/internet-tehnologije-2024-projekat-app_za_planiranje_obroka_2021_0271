<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Korisnik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function Register(Request $request)  {
        $validator = Validator::make($request->all(), [
            'ime' => 'required|string|max:50',
            'prezime' => 'required|string|max:50',
            'email' => 'required|string|max:50|email:unique:korisnici',
            'korisnicko_ime' => 'required|string|min:10|max:50',
            'sifra' => 'required|string|min:10'
        ]); //|max:50

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $korisnik = Korisnik::create([
            'ime' => $request->ime,
            'prezime' => $request->prezime,
            'email' => $request->email,
            'korisnicko_ime' => $request->korisnicko_ime,
            'sifra' => Hash::make($request->sifra),
        ]);

        $token = $korisnik->createToken('auth_token')->plainTextToken;

        return response()->json([
        'data' => $korisnik, 
        'access_token' => $token, 
        'token_type' => 'Bearer'
        ]);
    }

    public function login(Request $request) {
        if (!Auth::attempt(['email' => $request->email, 'password' => $request->sifra])) {
            return response()->json([
                "message" => "Neautorizovan pristup",
                "debug" => [
                    "email" => $request->email,
                    "entered_password" => $request->sifra,
                    "hashed_password_in_db" => Korisnik::where('email', $request->email)->value('sifra'),
                    "password_verification" => Hash::check($request->email, Korisnik::where('email', $request->email)->value('sifra')) ? "true" : "false"
                ]
            ], 401);
        }
    
        $korisnik = Korisnik::where('email', $request->email)->firstOrFail();
        $token = $korisnik->createToken('auth_token')->plainTextToken;
    
        return response()->json([
            "message" => "Dobrodosli " . $korisnik->ime . "!",
            "access_token" => $token,
            "token_type" => "Bearer"
        ]);
    }

    // public function login(Request $request)  {
    //     if (!Auth::attempt(['email' => $request->email, 'password' => $request->sifra])) {
    //         return response()->json(["message" => "Neautorizovan pristup"], 401);
    //     }

    //     $korisnik = Korisnik::where('email', $request['email'])->firstOrDefault();

    //     $token = $korisnik->createToken('auth_token')->plainTextToken;

    //     return response()->json([
    //         "message" => "Dobrodosli " . $korisnik->ime . " !",
    //         "acess_token" => $token,
    //         "token_type" => "Bearer"
    //     ]);
    // }
}
