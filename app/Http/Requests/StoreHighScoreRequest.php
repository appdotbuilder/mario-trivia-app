<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreHighScoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'player_name' => 'required|string|max:255',
            'score' => 'required|integer|min:0',
            'total_questions' => 'required|integer|min:1',
            'correct_answers' => 'required|integer|min:0|lte:total_questions',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'player_name.required' => 'Player name is required.',
            'score.required' => 'Score is required.',
            'score.min' => 'Score cannot be negative.',
            'total_questions.required' => 'Total questions is required.',
            'total_questions.min' => 'At least 1 question must be answered.',
            'correct_answers.required' => 'Number of correct answers is required.',
            'correct_answers.lte' => 'Correct answers cannot exceed total questions.',
        ];
    }
}