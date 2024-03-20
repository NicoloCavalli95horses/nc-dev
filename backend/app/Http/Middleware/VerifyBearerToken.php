<?php

namespace App\Http\Middleware;

use Closure;
class VerifyBearerToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $clientToken = $request->bearerToken();
        if ($clientToken && $clientToken === env('API_TOKEN')) {
            return $next($request);
        }
        return response()->json([
            'status' => 'FAIL',
            'code' => 401,
            'message' => 'missing or wrong bearer token',
          ], 200);
    }
}