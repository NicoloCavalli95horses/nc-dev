<?php

//==============================
// Import
//==============================
namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;


//==============================
// Class
//==============================
class TagsController extends Controller
{
  public function index(Request $request)
  {
    $items = Tag::all();

    return response()->json([
      'status' => 'OK',
      'code' => 200,
      'data' => $items,
    ], 200);
  }
}
