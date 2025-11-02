<?php

//==============================
// Import
//==============================
namespace App\Services;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;



//==============================
// Class
//==============================
class LoginService
{
  public function store(Request $request)
    {
      $adminCredentials = [
        'username' => env('ADMIN_USERNAME'),
        'password' => env('ADMIN_PASSWORD'),
      ];
  
      // Since 1 user (admin) is allowed, string matching is enough
      if ($request->username === $adminCredentials['username'] && $request->password === $adminCredentials['password']) {  
        return response()->json([
          'status' => 'OK',
          'code' => 200,
          'data' => [
            "auth" => true,
            "token" => env('API_TOKEN')
          ],
        ], 200);
    } else {
        return response()->json([
          'status' => 'FAIL',
          'code' => 401, // Unauthorized
          'data' => ["auth" => false],
        ], 401);
      }
    }
}
