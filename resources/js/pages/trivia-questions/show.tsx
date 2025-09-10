import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

interface TriviaQuestion {
    id: number;
    question: string;
    options: string[];
    correct_answer_index: number;
    difficulty: string;
    created_at: string;
}

interface Props {
    question: TriviaQuestion;
    [key: string]: unknown;
}

export default function TriviaQuestionShow({ question }: Props) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this trivia question? This action cannot be undone.')) {
            router.delete(route('trivia-questions.destroy', question.id));
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'text-green-600 bg-green-100';
            case 'medium': return 'text-yellow-600 bg-yellow-100';
            case 'hard': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getDifficultyStars = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return '⭐';
            case 'medium': return '⭐⭐';
            case 'hard': return '⭐⭐⭐';
            default: return '⭐';
        }
    };

    return (
        <>
            <Head title={`🧠 Trivia Question - ${question.question.substring(0, 50)}...`} />
            <div className="min-h-screen bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600">
                {/* Header */}
                <header className="bg-white bg-opacity-20 backdrop-blur-sm">
                    <div className="mx-auto max-w-4xl px-6 py-4">
                        <div className="flex items-center justify-between">
                            <Link href={route('trivia-questions.index')} className="flex items-center gap-2 text-white hover:text-yellow-300">
                                <span className="text-2xl">←</span>
                                <span className="font-bold">All Questions</span>
                            </Link>
                            <nav className="flex items-center gap-4">
                                <Link 
                                    href={route('trivia-questions.edit', question.id)}
                                    className="rounded-lg bg-yellow-500 px-4 py-2 font-bold text-red-800 transition-all hover:scale-105 hover:bg-yellow-400"
                                >
                                    ✏️ Edit
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    className="rounded-lg bg-red-600 px-4 py-2 font-bold text-white transition-all hover:scale-105 hover:bg-red-500"
                                >
                                    🗑️ Delete
                                </button>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="mx-auto max-w-4xl px-6 py-12">
                    <div className="rounded-3xl bg-white p-12 shadow-2xl">
                        {/* Question Header */}
                        <div className="mb-8 text-center">
                            <div className="mb-4 text-6xl">🧠</div>
                            <div className="mb-4">
                                <span className={`rounded-full px-4 py-2 text-lg font-bold ${getDifficultyColor(question.difficulty)}`}>
                                    {getDifficultyStars(question.difficulty)} {question.difficulty.toUpperCase()}
                                </span>
                            </div>
                        </div>

                        {/* Question */}
                        <div className="mb-8">
                            <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 lg:text-4xl">
                                {question.question}
                            </h1>
                        </div>

                        {/* Answer Options */}
                        <div className="mb-8">
                            <h2 className="mb-6 text-2xl font-bold text-gray-800 text-center">
                                📝 Answer Options
                            </h2>
                            <div className="space-y-4">
                                {question.options.map((option, index) => (
                                    <div 
                                        key={index}
                                        className={`rounded-xl p-6 text-lg ${
                                            index === question.correct_answer_index
                                                ? 'bg-green-100 border-2 border-green-300'
                                                : 'bg-gray-100'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="mr-4 text-xl font-bold">
                                                    {String.fromCharCode(65 + index)}.
                                                </span>
                                                {option}
                                            </div>
                                            {index === question.correct_answer_index && (
                                                <div className="flex items-center gap-2">
                                                    <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-bold text-white">
                                                        ✅ CORRECT
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Question Details */}
                        <div className="mb-8">
                            <h2 className="mb-4 text-2xl font-bold text-gray-800 text-center">
                                ℹ️ Question Details
                            </h2>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="rounded-xl bg-blue-50 p-4 text-center">
                                    <div className="text-sm font-semibold text-blue-600">DIFFICULTY</div>
                                    <div className="text-lg font-bold text-gray-800">
                                        {getDifficultyStars(question.difficulty)} {question.difficulty}
                                    </div>
                                </div>
                                <div className="rounded-xl bg-green-50 p-4 text-center">
                                    <div className="text-sm font-semibold text-green-600">ANSWER OPTIONS</div>
                                    <div className="text-lg font-bold text-gray-800">{question.options.length}</div>
                                </div>
                                <div className="rounded-xl bg-purple-50 p-4 text-center">
                                    <div className="text-sm font-semibold text-purple-600">CREATED</div>
                                    <div className="text-lg font-bold text-gray-800">
                                        {new Date(question.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Game Preview */}
                        <div className="mb-8 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 p-8">
                            <h2 className="mb-4 text-2xl font-bold text-gray-800 text-center">
                                🎮 Game Preview
                            </h2>
                            <p className="mb-4 text-center text-gray-600">
                                This is how players will see this question in the trivia game:
                            </p>
                            <div className="rounded-xl bg-white p-6 shadow-lg">
                                <div className="mb-4 text-center">
                                    <div className="text-2xl">
                                        {getDifficultyStars(question.difficulty)}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">
                                        {question.question}
                                    </h3>
                                </div>
                                <div className="space-y-2">
                                    {question.options.map((option, index) => (
                                        <div 
                                            key={index}
                                            className="rounded-lg bg-gray-100 p-3 text-lg hover:bg-blue-100"
                                        >
                                            <span className="mr-4 text-xl">
                                                {String.fromCharCode(65 + index)}
                                            </span>
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Link
                                href={route('trivia.index')}
                                className="flex-1 rounded-xl bg-green-600 py-4 text-center text-lg font-bold text-white transition-all hover:scale-105 hover:bg-green-500"
                            >
                                🎯 Test in Game
                            </Link>
                            <Link
                                href={route('trivia-questions.edit', question.id)}
                                className="flex-1 rounded-xl bg-yellow-500 py-4 text-center text-lg font-bold text-red-800 transition-all hover:scale-105 hover:bg-yellow-400"
                            >
                                ✏️ Edit Question
                            </Link>
                            <Link
                                href={route('trivia-questions.index')}
                                className="flex-1 rounded-xl bg-blue-600 py-4 text-center text-lg font-bold text-white transition-all hover:scale-105 hover:bg-blue-500"
                            >
                                📋 All Questions
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}