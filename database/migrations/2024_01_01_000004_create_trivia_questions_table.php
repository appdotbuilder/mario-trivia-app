<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trivia_questions', function (Blueprint $table) {
            $table->id();
            $table->text('question')->comment('The trivia question');
            $table->json('options')->comment('Array of answer options');
            $table->integer('correct_answer_index')->comment('Index of correct answer in options array');
            $table->enum('difficulty', ['easy', 'medium', 'hard'])->default('medium')->comment('Question difficulty');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('difficulty');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trivia_questions');
    }
};