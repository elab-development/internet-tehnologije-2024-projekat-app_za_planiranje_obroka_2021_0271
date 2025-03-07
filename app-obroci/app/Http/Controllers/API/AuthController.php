<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Mail\HiUserMail;
use App\Mail\PasswordResetMail;
use App\Models\Korisnik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\PasswordReset;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function Register(Request $request)  {
        $validator = Validator::make($request->all(), [
            'ime' => 'required|string|max:50',
            'prezime' => 'required|string|max:50',
            'email' => 'required|string|max:50|email:unique:korisnici',
            'korisnicko_ime' => 'required|string|min:10|max:50',
            'sifra' => 'required|string|min:10'
        ]);

        if ($validator->fails()) {
            
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ]);
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
        'token_type' => 'Bearer',
        'success' => true
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
                    "password_verification" => Hash::check($request->sifra, Korisnik::where('email', $request->email)->value('sifra')) ? "true" : "false"
                ],
                "success" => false
            ], 401);
        }
    
        $korisnik = Korisnik::where('email', $request->email)->firstOrFail();
        $token = $korisnik->createToken('auth_token')->plainTextToken;
    
        return response()->json([
            "message" => "Dobrodosli " . $korisnik->ime . "!",
            "access_token" => $token,
            "token_type" => "Bearer",
            "success" => true
        ]);
    }



    function logout(){
        $korisnik = Auth::user();

        if ($korisnik) {
            $korisnik->tokens->each(function ($token) {
                $token->delete();
            });
        }

        return response()->json([
            'Poruka' => 'Uspesno ste se izlogovali!'
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:korisnici,email',
        ]);

        $token = Str::random(6);

        PasswordReset::updateOrCreate(
            ['email' => $request->email],
            ['token' => Hash::make($token), 'created_at' => now()]
        );

        Mail::to($request->email)->send(new PasswordResetMail($token));

        return response()->json([
            'message' => 'Email poslat sa tokenom za resetovanje.',
            'token' => $token
        ]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:korisnici,email',
            'token' => 'required',
            'sifra' => 'required|string|min:10',
        ]);

        $reset = PasswordReset::where('email', $request->email)->first();
        if (!$reset) {
            return response()->json(['message' => 'Invalidan token.'], 400);
        }

        if (!Hash::check($request->token, $reset->token)) {
            return response()->json(['message' => 'Invalidan token.'], 400);
        }

        $korisnik = Korisnik::where('email', $request->email)->first();
        if (!$korisnik) {
            return response()->json(['message' => 'Korisnik nije pronadjen.'], 404);
        }

        $korisnik->sifra = Hash::make($request->sifra);
        $korisnik->save();

        $reset->delete();

        return response()->json(['message' => 'Sifra uspesno promenjena.']);
    }
}
