<?php

//==============================
// Import
//==============================
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller; 
use Illuminate\Http\Request;
use App\Services\LoginService;


//==============================
// Class
//==============================
class LoginController extends Controller
{
    protected $loginService;

    public function __construct(LoginService $loginService)
    {
      $this->loginService = $loginService;
    }

    public function store(Request $request)
    {
      return $this->loginService->store($request);
    }
}
