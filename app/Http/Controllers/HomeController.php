<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Character;
use App\Models\TriviaQuestion;
use App\Models\HighScore;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with featured content.
     */
    public function index()
    {
        $featuredCharacters = Character::latest()->take(6)->get();
        $triviaCount = TriviaQuestion::count();
        $topScores = HighScore::orderBy('score', 'desc')
            ->take(5)
            ->get();
        
        return Inertia::render('welcome', [
            'featured_characters' => $featuredCharacters,
            'trivia_count' => $triviaCount,
            'top_scores' => $topScores,
        ]);
    }
}