<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\TriviaQuestion
 *
 * @property int $id
 * @property string $question
 * @property array $options
 * @property int $correct_answer_index
 * @property string $difficulty
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|TriviaQuestion newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TriviaQuestion newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TriviaQuestion query()
 * @method static \Illuminate\Database\Eloquent\Builder|TriviaQuestion whereCorrectAnswerIndex($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TriviaQuestion whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TriviaQuestion whereDifficulty($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TriviaQuestion whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TriviaQuestion whereOptions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TriviaQuestion whereQuestion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TriviaQuestion whereUpdatedAt($value)
 * @method static \Database\Factories\TriviaQuestionFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class TriviaQuestion extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'question',
        'options',
        'correct_answer_index',
        'difficulty',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'options' => 'array',
        'correct_answer_index' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the correct answer text.
     *
     * @return string|null
     */
    public function getCorrectAnswerAttribute(): ?string
    {
        return $this->options[$this->correct_answer_index] ?? null;
    }
}