<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;

class PostController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $sortBy = $request->query('sort', 'updated_at');
    $sortOrder = $request->query('order', 'desc');
    $tags = $request->query('tags', '');
    $tagsArray = $tags ? explode(',', $tags) : [];
    $perPage = $request->query('per_page', 10);

    $query = Post::select('id','title','description','created_at','updated_at');
  
    // $query = Post::query();

    // Filter by tag
    if (!empty($tagsArray)) {
      $query->whereHas('tags', function ($query) use ($tagsArray) {
        // At least one of the tag
        $query->whereIn('name', $tagsArray);
      });
    }
  
    // Paginate and order by
    $items = $query->with('tags')->orderBy($sortBy, $sortOrder)->paginate($perPage);
  
    return response()->json([
      'status' => 'OK',
      'code' => 200,
      'data' => $items,
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

      // Create new post
      $article = Post::create([
        'title' => $validatedData['title'],
        'description' => $validatedData['description'],
        'content' => $validatedData['content'],
      ]);

      $tags = array_map(function($tag) { return trim($tag, '"'); }, explode(',', $validatedData['tags']));
      $tags = array_filter($tags);
      
      // Save new tag and associate to new post
      if (count($tags) > 0) {
        $tagIds = [];
        foreach ($tags as $tagName) {
          if (!empty($tagName)) {
            // find for the tag, create if not existing
            $tag = Tag::firstOrCreate(['name' => $tagName]);
            $tagIds[] = $tag->id;
          }
        }
        // sync tags to posts (pivot table)
        $article->tags()->sync($tagIds);
      }

      return response()->json([
        'status' => 'OK',
        'code' => 200,
        'data' => $article,
      ], 200);

    } catch (\Exception $e) {
      return response()->json([
        'status' => 'FAIL',
        'code' => 500,
        'message' => 'unable to save new article',
        'error' => $e->getMessage(),
      ], 500);
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(Post $post)
  {
    $post->load('tags');

    return response()->json([
        'status' => 'OK',
        'code' => 200,
        'data' => $post,
    ], 200);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Post $post)
{
    // Validazione dei campi passati
    $validatedData = $request->validate([
      'title' => 'sometimes|string|max:255',
      'description' => 'sometimes|string|max:255',
      'content' => 'sometimes|string|max:10000',
    ]);

    // Aggiornamento del post con i campi validati
    $post->update($validatedData);

    // Gestione dei tag
    if ($request->has('tags')) {
      $tags = array_map(function($tag) { return trim($tag, '"'); }, explode(',', $request['tags']));
      $tags = array_filter($tags);

      if (count($tags) > 0) {
        $tagIds = [];
        foreach ($tags as $tagName) {
          if (!empty($tagName)) {
            $tag = Tag::firstOrCreate(['name' => $tagName]);
            $tagIds[] = $tag->id;
          }
        }
        $post->tags()->sync($tagIds);
      } else {
        $post->tags()->detach();
      }
    }

    Tag::doesntHave('posts')->delete();

    return response()->json([
      'status' => 'OK',
      'code' => 200,
      'data' => $post,
    ], 200);
}


  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Post $post)
  {
    $tags = $post->tags;
    $post->delete();
  
    foreach ($tags as $tag) {
      if ($tag->posts()->count() === 0) {
        $tag->delete();
      }
    }
  
    return response()->json([
      'status' => 'OK',
      'code' => 200,
      'data' => 'article and associated tags (if unused) deleted',
    ], 200);
  }
}
