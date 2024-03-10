<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
  public function store(Request $request)
  {
    $adminCredentials = [
      'username' => env('ADMIN_USERNAME'),
      'password' => env('ADMIN_PASSWORD'),
    ];

    if ($request->username == $adminCredentials['username'] && Hash::check($request->password, Hash::make($adminCredentials['password']))) {
      return response()->json([
          'status' => 'OK',
          'code' => 200,
          'data' => ["auth" => true],
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
