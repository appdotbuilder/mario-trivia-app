<?php

namespace Database\Seeders;

use App\Models\Character;
use App\Models\HighScore;
use App\Models\TriviaQuestion;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Mario Admin',
            'email' => 'admin@mario.com',
        ]);

        // Seed Super Mario characters
        $characters = [
            [
                'name' => 'Mario',
                'description' => 'The heroic plumber and main protagonist of the Super Mario series. Mario is known for his red cap, blue overalls, and his mission to rescue Princess Peach from the evil Bowser.',
                'image_url' => 'https://via.placeholder.com/200x200/FF0000/FFFFFF?text=Mario'
            ],
            [
                'name' => 'Luigi',
                'description' => 'Mario\'s younger brother, known for his green cap and overalls. Luigi is often portrayed as more cautious than Mario but equally brave when needed.',
                'image_url' => 'https://via.placeholder.com/200x200/00FF00/FFFFFF?text=Luigi'
            ],
            [
                'name' => 'Princess Peach',
                'description' => 'The ruler of the Mushroom Kingdom, Princess Peach is often kidnapped by Bowser but is also a capable leader and occasional playable character.',
                'image_url' => 'https://via.placeholder.com/200x200/FFC0CB/FFFFFF?text=Peach'
            ],
            [
                'name' => 'Bowser',
                'description' => 'The primary antagonist of the Super Mario series. Bowser is the king of the Koopas and ruler of the Dark Land, constantly plotting to kidnap Princess Peach and conquer the Mushroom Kingdom.',
                'image_url' => 'https://via.placeholder.com/200x200/8B4513/FFFFFF?text=Bowser'
            ],
            [
                'name' => 'Yoshi',
                'description' => 'A friendly dinosaur companion who helps Mario on his adventures. Yoshi can eat enemies and turn them into eggs, and comes in various colors.',
                'image_url' => 'https://via.placeholder.com/200x200/32CD32/FFFFFF?text=Yoshi'
            ],
            [
                'name' => 'Toad',
                'description' => 'A mushroom retainer who serves Princess Peach in the Mushroom Kingdom. Toad is loyal and helpful, often providing assistance to Mario.',
                'image_url' => 'https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=Toad'
            ],
        ];

        foreach ($characters as $character) {
            Character::create($character);
        }

        // Seed trivia questions
        $questions = [
            [
                'question' => 'What is Mario\'s profession?',
                'options' => ['Plumber', 'Doctor', 'Chef', 'Builder'],
                'correct_answer_index' => 0,
                'difficulty' => 'easy'
            ],
            [
                'question' => 'What is the name of Mario\'s brother?',
                'options' => ['Luigi', 'Wario', 'Waluigi', 'Bowser'],
                'correct_answer_index' => 0,
                'difficulty' => 'easy'
            ],
            [
                'question' => 'What does Mario use to break blocks?',
                'options' => ['His fist', 'His head', 'A hammer', 'His feet'],
                'correct_answer_index' => 1,
                'difficulty' => 'medium'
            ],
            [
                'question' => 'What power-up makes Mario bigger?',
                'options' => ['Fire Flower', 'Super Mushroom', 'Star', 'Cape Feather'],
                'correct_answer_index' => 1,
                'difficulty' => 'easy'
            ],
            [
                'question' => 'In which year was the original Super Mario Bros. released?',
                'options' => ['1983', '1985', '1987', '1989'],
                'correct_answer_index' => 1,
                'difficulty' => 'hard'
            ],
            [
                'question' => 'What is the name of Mario\'s home kingdom?',
                'options' => ['Mushroom Kingdom', 'Koopa Kingdom', 'Star Kingdom', 'Fire Kingdom'],
                'correct_answer_index' => 0,
                'difficulty' => 'easy'
            ],
            [
                'question' => 'Which company created the Super Mario series?',
                'options' => ['Sony', 'Nintendo', 'Sega', 'Microsoft'],
                'correct_answer_index' => 1,
                'difficulty' => 'easy'
            ],
            [
                'question' => 'What does a Fire Flower power-up allow Mario to do?',
                'options' => ['Fly', 'Throw fireballs', 'Become invincible', 'Swim faster'],
                'correct_answer_index' => 1,
                'difficulty' => 'medium'
            ],
            [
                'question' => 'Who is the creator of Mario?',
                'options' => ['Shigeru Miyamoto', 'Hideo Kojima', 'Satoru Iwata', 'Gunpei Yokoi'],
                'correct_answer_index' => 0,
                'difficulty' => 'hard'
            ],
            [
                'question' => 'What is Mario\'s original name from Donkey Kong?',
                'options' => ['Jumpman', 'Red Man', 'Plumber Man', 'Hero Man'],
                'correct_answer_index' => 0,
                'difficulty' => 'hard'
            ],
        ];

        foreach ($questions as $question) {
            TriviaQuestion::create($question);
        }

        // Seed some high scores
        $highScores = [
            ['player_name' => 'Mario Master', 'score' => 100, 'total_questions' => 10, 'correct_answers' => 10],
            ['player_name' => 'Luigi Fan', 'score' => 90, 'total_questions' => 10, 'correct_answers' => 9],
            ['player_name' => 'Peach Pro', 'score' => 85, 'total_questions' => 10, 'correct_answers' => 8],
            ['player_name' => 'Yoshi Rider', 'score' => 80, 'total_questions' => 10, 'correct_answers' => 8],
            ['player_name' => 'Mushroom King', 'score' => 75, 'total_questions' => 10, 'correct_answers' => 7],
        ];

        foreach ($highScores as $score) {
            HighScore::create($score);
        }
    }
}
