<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTriviaQuestionRequest;
use App\Http\Requests\UpdateTriviaQuestionRequest;
use App\Models\TriviaQuestion;
use Inertia\Inertia;

class TriviaQuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $questions = TriviaQuestion::latest()->paginate(15);
        
        return Inertia::render('trivia-questions/index', [
            'questions' => $questions
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('trivia-questions/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTriviaQuestionRequest $request)
    {
        $question = TriviaQuestion::create($request->validated());

        return redirect()->route('trivia-questions.index')
            ->with('success', 'Trivia question created successfully! 🧠');
    }

    /**
     * Display the specified resource.
     */
    public function show(TriviaQuestion $triviaQuestion)
    {
        return Inertia::render('trivia-questions/show', [
            'question' => $triviaQuestion
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TriviaQuestion $triviaQuestion)
    {
        return Inertia::render('trivia-questions/edit', [
            'question' => $triviaQuestion
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTriviaQuestionRequest $request, TriviaQuestion $triviaQuestion)
    {
        $triviaQuestion->update($request->validated());

        return redirect()->route('trivia-questions.show', $triviaQuestion)
            ->with('success', 'Trivia question updated successfully! ✨');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TriviaQuestion $triviaQuestion)
    {
        $triviaQuestion->delete();

        return redirect()->route('trivia-questions.index')
            ->with('success', 'Trivia question deleted successfully! 🗑️');
    }
}