<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Character>
 */
class CharacterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $characters = [
            ['Mario', 'The heroic plumber who saves Princess Peach from Bowser.'],
            ['Luigi', 'Mario\'s younger brother, known for his green outfit and jumping ability.'],
            ['Princess Peach', 'The ruler of the Mushroom Kingdom, often kidnapped by Bowser.'],
            ['Bowser', 'The main antagonist, a large turtle-like creature who rules the Koopa Kingdom.'],
            ['Yoshi', 'A friendly dinosaur companion who helps Mario on his adventures.'],
            ['Toad', 'A mushroom retainer who serves Princess Peach in the Mushroom Kingdom.'],
        ];

        $character = fake()->randomElement($characters);

        return [
            'name' => $character[0],
            'description' => $character[1],
            'image_url' => fake()->imageUrl(200, 200, 'animals', true, $character[0]),
        ];
    }
}