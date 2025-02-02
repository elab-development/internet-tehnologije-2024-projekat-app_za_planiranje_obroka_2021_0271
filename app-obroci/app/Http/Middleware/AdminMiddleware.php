<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
  

    public function handle(Request $request, Closure $next)
    {
        $korisnik = $request->user();
        if (!$korisnik || $korisnik->uloga !== 'admin') {
            return response()->json(['Greska' => 'Neautorizovan. Pristup dozovljen samo adminima!'], 403);
        }
        return $next($request);
    }

}
