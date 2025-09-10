<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\HighScore
 *
 * @property int $id
 * @property string $player_name
 * @property int $score
 * @property int $total_questions
 * @property int $correct_answers
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|HighScore newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HighScore newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HighScore query()
 * @method static \Illuminate\Database\Eloquent\Builder|HighScore whereCorrectAnswers($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HighScore whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HighScore whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HighScore wherePlayerName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HighScore whereScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HighScore whereTotalQuestions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HighScore whereUpdatedAt($value)
 * @method static \Database\Factories\HighScoreFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class HighScore extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'player_name',
        'score',
        'total_questions',
        'correct_answers',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'score' => 'integer',
        'total_questions' => 'integer',
        'correct_answers' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the accuracy percentage.
     *
     * @return float
     */
    public function getAccuracyAttribute(): float
    {
        if ($this->total_questions === 0) {
            return 0;
        }
        
        return round(($this->correct_answers / $this->total_questions) * 100, 2);
    }
}