<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // Read token from header
        $authHeader = $request->header('Authorization');

        // Check header
        if (!$authHeader || $authHeader !== 'Bearer ' . env('API_TOKEN')) {
            return response()->json([
                'status' => 'FAIL',
                'code' => 401,
                'message' => 'Unauthorized: invalid or missing API token',
            ], 401);
        }

        return $next($request);
    }
}
