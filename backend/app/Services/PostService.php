<?php

//==============================
// Import
//==============================
namespace App\Services;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Tag;


//==============================
// Class
//==============================
class PostService
{
  //  Display a listing of the resources
  public function index(Request $request)
  {
    try {
      $sortBy = $request->query('sort', 'updated_at');
      $sortOrder = $request->query('order', 'desc');
      $tags = $request->query('tags', '');
      $tagsArray = $tags ? explode(',', $tags) : [];
      $perPage = $request->query('per_page', 10);
      
      $query = Post::select('id','title','description','created_at','updated_at');
      
      // Filter by tag
      if (!empty($tagsArray)) {
        $query->whereHas('tags', function ($query) use ($tagsArray) {
          $query->whereIn('name', $tagsArray); // At least one of the tag
        });
      } 
      return $query->with('tags')->orderBy($sortBy, $sortOrder)->paginate($perPage);
    } catch (\Exception $e) {
      return false;
    }
  }

  //  Store a new post
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

      return $article;

    } catch (\Exception $e) {
      return false;
    }
  }


  // Update existing post or tags
  public function update(Request $request, Post $post)
  {
    try {
      // Validate fields
      $validatedData = $request->validate([
        'title' => 'sometimes|string|max:255',
        'description' => 'sometimes|string|max:255',
        'content' => 'sometimes|string|max:10000',
      ]);

      // Post update
      $post->update($validatedData);

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
      return $post;
    } catch (\Exception $e) {
      return false;
    }
  }


  //  Delete existing post and unused tags
  public function destroy(Post $post)
  {
    try {
    $tags = $post->tags;

    $deleted = $post->delete();
    if (!$deleted) {
      return false;
    }

    foreach ($tags as $tag) {
      if ($tag->posts()->count() === 0) {
        $tag->delete();
      }
    }

    return true;
  } catch (\Exception $e) {
      return false;
    }
  }
}
