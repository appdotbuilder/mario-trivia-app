<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TriviaQuestion>
 */
class TriviaQuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $questions = [
            [
                'question' => 'What is Mario\'s profession?',
                'options' => ['Plumber', 'Doctor', 'Chef', 'Builder'],
                'correct' => 0,
                'difficulty' => 'easy'
            ],
            [
                'question' => 'What is the name of Mario\'s brother?',
                'options' => ['Luigi', 'Wario', 'Waluigi', 'Bowser'],
                'correct' => 0,
                'difficulty' => 'easy'
            ],
            [
                'question' => 'What does Mario use to break blocks?',
                'options' => ['His fist', 'His head', 'A hammer', 'His feet'],
                'correct' => 1,
                'difficulty' => 'medium'
            ],
            [
                'question' => 'What power-up makes Mario bigger?',
                'options' => ['Fire Flower', 'Super Mushroom', 'Star', 'Cape Feather'],
                'correct' => 1,
                'difficulty' => 'easy'
            ],
            [
                'question' => 'In which year was the original Super Mario Bros. released?',
                'options' => ['1983', '1985', '1987', '1989'],
                'correct' => 1,
                'difficulty' => 'hard'
            ],
        ];

        $question = fake()->randomElement($questions);

        return [
            'question' => $question['question'],
            'options' => $question['options'],
            'correct_answer_index' => $question['correct'],
            'difficulty' => $question['difficulty'],
        ];
    }

    /**
     * Set the question difficulty to easy.
     */
    public function easy(): static
    {
        return $this->state(fn (array $attributes) => [
            'difficulty' => 'easy',
        ]);
    }

    /**
     * Set the question difficulty to medium.
     */
    public function medium(): static
    {
        return $this->state(fn (array $attributes) => [
            'difficulty' => 'medium',
        ]);
    }

    /**
     * Set the question difficulty to hard.
     */
    public function hard(): static
    {
        return $this->state(fn (array $attributes) => [
            'difficulty' => 'hard',
        ]);
    }
}