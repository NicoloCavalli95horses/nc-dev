<?php

//==============================
// Import
//==============================
namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use App\Services\PostService;


//==============================
// Class
//==============================
class PostController extends Controller
{

  protected $postService;

  public function __construct(PostService $postService)
  {
    $this->postService = $postService;
  }


  //  Display a listing of the resources
  public function index(Request $request)
  {
    $posts = $this->postService->index($request);

    if ($posts) {
      return response()->json([
        'status' => 'OK',
        'code' => 200,
        'data' => $posts,
      ], 200);
    }
    return response()->json([
      'status' => 'ERROR',
      'code' => 500,
      'message' => 'Internal server error',
    ], 500);
  }


  // Store a newly created resource in storage.
  public function store(Request $request)
  {
    $data = $this->postService->store($request);
    
    if($data) {
      return response()->json([
        'status' => 'OK',
        'code' => 200,
        'data' => $data,
      ], 200);
    }
    return response()->json([
      'status' => 'FAIL',
      'code' => 500,
      'message' => 'unable to save new article',
    ], 500);
  }


  // Display the specified resource.
  public function show(Post $post)
  {
    $post->load('tags');

    return response()->json([
      'status' => 'OK',
      'code' => 200,
      'data' => $post,
    ], 200);
  }


  // Update the specified resource in storage.
  public function update(Request $request, Post $post)
  {

    $data = $this->postService->update($request, $post);

    if ($data) {
      return response()->json([
        'status' => 'OK',
        'code' => 200,
        'data' => $data,
      ], 200);
    }

    return response()->json([
      'status' => 'FAIL',
      'code' => 500,
      'message' => 'Update failed',
    ], 500);
  }


  // Remove the specified resource from storage.
  public function destroy(Post $post)
  {
    $success = $this->postService->destroy($post);

    if ($success) {
      return response()->json([
        'status' => 'OK',
        'code' => 200,
        'data' => 'Post and unused tags deleted',
      ], 200);
    }

    return response()->json([
      'status' => 'FAIL',
      'code' => 500,
      'message' => 'Deletion failed',
    ], 500);
  }
}
