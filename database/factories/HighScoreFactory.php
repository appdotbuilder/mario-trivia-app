<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HighScore>
 */
class HighScoreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $totalQuestions = fake()->numberBetween(5, 20);
        $correctAnswers = fake()->numberBetween(0, $totalQuestions);
        
        return [
            'player_name' => fake()->name(),
            'score' => $correctAnswers * 10, // 10 points per correct answer
            'total_questions' => $totalQuestions,
            'correct_answers' => $correctAnswers,
        ];
    }

    /**
     * Create a perfect score.
     */
    public function perfect(): static
    {
        return $this->state(fn (array $attributes) => [
            'correct_answers' => $attributes['total_questions'],
            'score' => $attributes['total_questions'] * 10,
        ]);
    }
}