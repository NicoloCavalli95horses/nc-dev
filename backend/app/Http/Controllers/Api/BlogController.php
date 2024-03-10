<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return response()->json([
      'status' => 'OK',
      'code' => 200,
      'data' => Blog::all(),
    ], 200);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    try {
      $validatedData = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string|max:255',
        'content' => 'required|string|max:10000',
        'tags' => 'required|string',
      ]);
      $article = Blog::create($validatedData);
      return response()->json([
        'status' => 'OK',
        'code' => 200,
        'data' => $article,
      ], 200);
    } catch (\Exception $e) {
      Log::error($e);
      return response()->json([
        'status' => 'FAIL',
        'code' => 500,
        'message' => 'unable to save new article',
        'error' => $e->getMessage(),
      ], 200);
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(Blog $blog)
  {
    return response()->json([
      'status' => 'OK',
      'code' => 200,
      'data' => $blog,
    ], 200);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Blog $blog)
  {
    $blog->update($request->validate([
     'title' => 'sometimes|string|max:255',
     'description' => 'sometimes|string|max:255',
     'content' => 'sometimes|string|max:10000',
     'tags' => 'sometimes|string',
    ]));
    return response()->json([
      'status' => 'OK',
      'code' => 200,
      'data' => $blog,
    ], 200);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Blog $blog)
  {
    $blog->delete();
    return response()->json([
      'status' => 'OK',
      'code' => 200,
      'data' => 'article deleted',
    ], 200); 
  }
}
