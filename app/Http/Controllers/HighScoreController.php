<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\HighScore;
use Inertia\Inertia;

class HighScoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $highScores = HighScore::orderBy('score', 'desc')
            ->orderBy('created_at', 'asc')
            ->take(50)
            ->get();
        
        return Inertia::render('high-scores/index', [
            'high_scores' => $highScores
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(HighScore $highScore)
    {
        return Inertia::render('high-scores/show', [
            'high_score' => $highScore
        ]);
    }
}