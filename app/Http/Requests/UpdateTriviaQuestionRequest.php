<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTriviaQuestionRequest extends FormRequest
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
            'question' => 'required|string',
            'options' => 'required|array|min:2|max:6',
            'options.*' => 'required|string|max:255',
            'correct_answer_index' => 'required|integer|min:0|max:5',
            'difficulty' => 'required|in:easy,medium,hard',
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
            'question.required' => 'Question text is required.',
            'options.required' => 'Answer options are required.',
            'options.min' => 'At least 2 answer options are required.',
            'options.max' => 'Maximum 6 answer options allowed.',
            'options.*.required' => 'All answer options must be filled.',
            'correct_answer_index.required' => 'Correct answer selection is required.',
            'difficulty.required' => 'Difficulty level is required.',
            'difficulty.in' => 'Difficulty must be easy, medium, or hard.',
        ];
    }
}