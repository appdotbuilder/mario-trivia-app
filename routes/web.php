<?php

use App\Http\Controllers\CharacterController;
use App\Http\Controllers\HighScoreController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TriviaController;
use App\Http\Controllers\TriviaQuestionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page with Super Mario content
Route::get('/', [HomeController::class, 'index'])->name('home');

// Public routes for the Super Mario app
Route::get('/characters', [CharacterController::class, 'index'])->name('characters.index');
Route::get('/characters/{character}', [CharacterController::class, 'show'])->name('characters.show');

Route::get('/trivia', [TriviaController::class, 'index'])->name('trivia.index');
Route::post('/trivia', [TriviaController::class, 'store'])->name('trivia.store');
Route::post('/trivia/complete', [TriviaController::class, 'show'])->name('trivia.complete');

Route::get('/high-scores', [HighScoreController::class, 'index'])->name('high-scores.index');
Route::get('/high-scores/{high_score}', [HighScoreController::class, 'show'])->name('high-scores.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Admin routes for managing characters
    Route::get('/characters/create', [CharacterController::class, 'create'])->name('characters.create');
    Route::post('/characters', [CharacterController::class, 'store'])->name('characters.store');
    Route::get('/characters/{character}/edit', [CharacterController::class, 'edit'])->name('characters.edit');
    Route::put('/characters/{character}', [CharacterController::class, 'update'])->name('characters.update');
    Route::delete('/characters/{character}', [CharacterController::class, 'destroy'])->name('characters.destroy');
    
    // Admin routes for managing trivia questions
    Route::resource('trivia-questions', TriviaQuestionController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
