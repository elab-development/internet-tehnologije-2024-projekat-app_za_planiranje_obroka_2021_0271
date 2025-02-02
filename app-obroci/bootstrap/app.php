<?php

use App\Http\Middleware\AdminMiddleware;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Symfony\Component\Routing\Exception\RouteNotFoundException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (RouteNotFoundException $exception) {
            return response()->json([
                'error' => 'Ruta nije pronađena.',
                'message' => $exception->getMessage()
            ], 404);
        });

        $exceptions->render(function (AuthenticationException $exception) {
            return response()->json([
                'error' => 'Unauthenticated',
                'message' => 'Morate biti prijavljeni da biste pristupili ovoj ruti.'
            ], 401);
        });
    })->create();
