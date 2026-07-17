<?php

//==============================
// Import
//==============================
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;


//==============================
// Class
//==============================
class GitHubController extends Controller
{
    public function index(Request $request)
    {
        $url = 'https://api.github.com/users/NicoloCavalli95horses/repos';
        $response = Http::withToken(config('services.github.token'))->get($url, ['per_page' => 100, 'page' => 1]);
        return response()->json($response->json());
    }
}
