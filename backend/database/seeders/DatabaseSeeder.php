<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        \App\Models\Tag::factory(10)->count(10)->create();
        \App\Models\Post::factory(30)->create();
    }
}