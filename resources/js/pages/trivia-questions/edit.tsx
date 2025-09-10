import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

interface TriviaQuestion {
    id: number;
    question: string;
    options: string[];
    correct_answer_index: number;
    difficulty: string;
}

interface Props {
    question: TriviaQuestion;
    [key: string]: unknown;
}

export default function TriviaQuestionEdit({ question }: Props) {
    const [numOptions, setNumOptions] = useState(question.options.length);
    
    const { data, setData, put, processing, errors } = useForm({
        question: question.question,
        options: [...question.options],
        correct_answer_index: question.correct_answer_index,
        difficulty: question.difficulty,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Filter out empty options
        const filteredOptions = data.options.filter((option: string) => option.trim() !== '');
        setData('options', filteredOptions);
        put(route('trivia-questions.update', question.id));
    };

    const updateOption = (index: number, value: string) => {
        const newOptions = [...data.options];
        newOptions[index] = value;
        setData('options', newOptions);
    };

    const addOption = () => {
        if (numOptions < 6) {
            setNumOptions(numOptions + 1);
            setData('options', [...data.options, '']);
        }
    };

    const removeOption = () => {
        if (numOptions > 2) {
            setNumOptions(numOptions - 1);
            const newOptions = data.options.slice(0, -1);
            setData('options', newOptions);
            // Adjust correct answer index if necessary
            if (data.correct_answer_index >= numOptions - 1) {
                setData('correct_answer_index', 0);
            }
        }
    };

    return (
        <>
            <Head title={`✏️ Edit Trivia Question - ${question.question.substring(0, 30)}...`} />
            <div className="min-h-screen bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600">
                {/* Header */}
                <header className="bg-white bg-opacity-20 backdrop-blur-sm">
                    <div className="mx-auto max-w-4xl px-6 py-4">
                        <div className="flex items-center justify-between">
                            <Link href={route('trivia-questions.show', question.id)} className="flex items-center gap-2 text-white hover:text-yellow-300">
                                <span className="text-2xl">←</span>
                                <span className="font-bold">Back to Question</span>
                            </Link>
                            <Link 
                                href={route('trivia-questions.index')}
                                className="rounded-lg border-2 border-white px-4 py-2 font-bold text-white transition-all hover:bg-white hover:text-purple-600"
                            >
                                📋 All Questions
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="mx-auto max-w-3xl px-6 py-12">
                    <div className="rounded-3xl bg-white p-12 shadow-2xl">
                        <div className="mb-8 text-center">
                            <h1 className="mb-4 text-4xl font-bold text-purple-600">
                                ✏️ Edit Trivia Question
                            </h1>
                            <p className="text-lg text-gray-600">
                                Update your Super Mario trivia question
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Question Text */}
                            <div>
                                <label htmlFor="question" className="mb-2 block text-lg font-bold text-gray-800">
                                    ❓ Question
                                </label>
                                <textarea
                                    id="question"
                                    value={data.question}
                                    onChange={(e) => setData('question', e.target.value)}
                                    rows={3}
                                    className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-lg transition-colors focus:border-purple-500 focus:outline-none"
                                    placeholder="What is your Super Mario question?"
                                    required
                                />
                                {errors.question && (
                                    <p className="mt-2 text-sm font-semibold text-red-600">❌ {errors.question}</p>
                                )}
                            </div>

                            {/* Difficulty Level */}
                            <div>
                                <label htmlFor="difficulty" className="mb-2 block text-lg font-bold text-gray-800">
                                    ⭐ Difficulty Level
                                </label>
                                <select
                                    id="difficulty"
                                    value={data.difficulty}
                                    onChange={(e) => setData('difficulty', e.target.value)}
                                    className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-lg transition-colors focus:border-purple-500 focus:outline-none"
                                    required
                                >
                                    <option value="easy">⭐ Easy</option>
                                    <option value="medium">⭐⭐ Medium</option>
                                    <option value="hard">⭐⭐⭐ Hard</option>
                                </select>
                                {errors.difficulty && (
                                    <p className="mt-2 text-sm font-semibold text-red-600">❌ {errors.difficulty}</p>
                                )}
                            </div>

                            {/* Answer Options */}
                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <label className="text-lg font-bold text-gray-800">
                                        📝 Answer Options ({numOptions})
                                    </label>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={removeOption}
                                            disabled={numOptions <= 2}
                                            className="rounded-lg bg-red-500 px-3 py-1 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-red-400 disabled:opacity-50"
                                        >
                                            ➖ Remove
                                        </button>
                                        <button
                                            type="button"
                                            onClick={addOption}
                                            disabled={numOptions >= 6}
                                            className="rounded-lg bg-green-500 px-3 py-1 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-green-400 disabled:opacity-50"
                                        >
                                            ➕ Add
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="space-y-3">
                                    {Array.from({ length: numOptions }).map((_, index) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id={`correct_${index}`}
                                                    name="correct_answer"
                                                    checked={data.correct_answer_index === index}
                                                    onChange={() => setData('correct_answer_index', index)}
                                                    className="mr-2 h-4 w-4 text-green-500"
                                                />
                                                <label htmlFor={`correct_${index}`} className="text-sm font-semibold text-gray-600">
                                                    Correct
                                                </label>
                                            </div>
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    value={data.options[index] || ''}
                                                    onChange={(e) => updateOption(index, e.target.value)}
                                                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                                                    className={`w-full rounded-lg border-2 px-4 py-3 text-lg transition-colors focus:outline-none ${
                                                        data.correct_answer_index === index
                                                            ? 'border-green-300 bg-green-50 focus:border-green-500'
                                                            : 'border-gray-300 focus:border-purple-500'
                                                    }`}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {errors.options && (
                                    <p className="mt-2 text-sm font-semibold text-red-600">❌ {errors.options}</p>
                                )}
                                {errors.correct_answer_index && (
                                    <p className="mt-2 text-sm font-semibold text-red-600">❌ {errors.correct_answer_index}</p>
                                )}
                                
                                <p className="mt-2 text-sm text-gray-500">
                                    💡 Select the correct answer by clicking the radio button next to it.
                                </p>
                            </div>

                            {/* Preview */}
                            {data.question && data.options.some(option => option.trim()) && (
                                <div className="rounded-xl bg-gray-50 p-6">
                                    <h3 className="mb-4 text-lg font-bold text-gray-800">📋 Preview</h3>
                                    <div className="mb-3 text-lg font-semibold text-gray-700">
                                        {data.question}
                                    </div>
                                    <div className="space-y-2">
                                        {data.options.map((option, index) => (
                                            option.trim() && (
                                                <div 
                                                    key={index}
                                                    className={`rounded-lg p-3 ${
                                                        data.correct_answer_index === index
                                                            ? 'bg-green-100 border-2 border-green-300'
                                                            : 'bg-white border border-gray-200'
                                                    }`}
                                                >
                                                    <span className="mr-2 font-bold">
                                                        {String.fromCharCode(65 + index)}.
                                                    </span>
                                                    {option}
                                                    {data.correct_answer_index === index && (
                                                        <span className="ml-2">✅ Correct Answer</span>
                                                    )}
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-6">
                                <Link
                                    href={route('trivia-questions.show', question.id)}
                                    className="flex-1 rounded-xl bg-gray-500 py-4 text-center text-lg font-bold text-white transition-all hover:scale-105 hover:bg-gray-400"
                                >
                                    ❌ Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 rounded-xl bg-purple-600 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:bg-purple-500 disabled:opacity-50"
                                >
                                    {processing ? '⏳ Saving...' : '💾 Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}