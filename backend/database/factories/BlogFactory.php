<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Blog>
 */
class BlogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tagsNum = fake()->numberBetween(1, 3);
        $tags = fake()->words($tagsNum);

        return [
            'title' => fake()->sentence(4),
            'description' => fake()->text,
            'content' => fake()->text,
            'tags' => json_encode($tags),
        ];
    }
}
