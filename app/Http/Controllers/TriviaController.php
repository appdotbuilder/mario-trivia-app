<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreHighScoreRequest;
use App\Models\TriviaQuestion;
use App\Models\HighScore;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TriviaController extends Controller
{
    /**
     * Display the trivia game.
     */
    public function index()
    {
        $questions = TriviaQuestion::inRandomOrder()->take(10)->get();
        
        if ($questions->isEmpty()) {
            return Inertia::render('trivia/index', [
                'questions' => [],
                'message' => 'No trivia questions available. Please add some questions first! 🤔'
            ]);
        }
        
        return Inertia::render('trivia/index', [
            'questions' => $questions->map(function ($question) {
                return [
                    'id' => $question->id,
                    'question' => $question->question,
                    'options' => $question->options,
                    'difficulty' => $question->difficulty,
                    // Don't send correct_answer_index to frontend
                ];
            })
        ]);
    }

    /**
     * Check the answer for a trivia question.
     */
    public function store(Request $request)
    {
        $request->validate([
            'question_id' => 'required|exists:trivia_questions,id',
            'answer_index' => 'required|integer|min:0',
        ]);

        $question = TriviaQuestion::findOrFail($request->question_id);
        $isCorrect = $question->correct_answer_index === $request->answer_index;
        
        return Inertia::render('trivia/answer', [
            'is_correct' => $isCorrect,
            'correct_answer' => $question->options[$question->correct_answer_index],
            'question' => $question->question,
        ]);
    }

    /**
     * Submit the final score.
     */
    public function show(StoreHighScoreRequest $request)
    {
        $highScore = HighScore::create($request->validated());

        return Inertia::render('trivia/complete', [
            'high_score' => $highScore,
            'message' => 'Great job! Your score has been saved! 🏆'
        ]);
    }
}