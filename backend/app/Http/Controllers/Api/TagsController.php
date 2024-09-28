<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class TagsController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $items = [
        'test' => 2,
        'prova' => 4
    ];

    return response()->json([
      'status' => 'OK',
      'code' => 200,
      'data' => $items,
    ], 200);
  }

}
