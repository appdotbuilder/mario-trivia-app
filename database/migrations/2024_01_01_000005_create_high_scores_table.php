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
        Schema::create('high_scores', function (Blueprint $table) {
            $table->id();
            $table->string('player_name')->comment('Player name');
            $table->integer('score')->comment('Final score');
            $table->integer('total_questions')->comment('Total questions answered');
            $table->integer('correct_answers')->comment('Number of correct answers');
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['score', 'created_at']);
            $table->index('player_name');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('high_scores');
    }
};