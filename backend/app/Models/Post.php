<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'description', 'content', 'tags', 'start_time', 'id'];
    use HasFactory;

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'post_tag');
    }
}
