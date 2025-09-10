import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface TriviaQuestion {
    id: number;
    question: string;
    options: string[];
    correct_answer_index: number;
    difficulty: string;
    created_at: string;
}

interface Props {
    questions: {
        data: TriviaQuestion[];
        current_page: number;
        last_page: number;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    [key: string]: unknown;
}

export default function TriviaQuestionsIndex({ questions }: Props) {

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
            <Head title="🧠 Manage Trivia Questions - Admin" />
            <div className="min-h-screen bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600">
                {/* Header */}
                <header className="bg-white bg-opacity-20 backdrop-blur-sm">
                    <div className="mx-auto max-w-6xl px-6 py-4">
                        <div className="flex items-center justify-between">
                            <Link href={route('dashboard')} className="flex items-center gap-2 text-white hover:text-yellow-300">
                                <span className="text-2xl">🏰</span>
                                <span className="font-bold">Dashboard</span>
                            </Link>
                            <nav className="flex items-center gap-4">
                                <Link 
                                    href={route('trivia.index')}
                                    className="rounded-lg bg-green-500 px-4 py-2 font-bold text-white transition-all hover:scale-105 hover:bg-green-400"
                                >
                                    🎮 Play Game
                                </Link>
                                <Link 
                                    href={route('trivia-questions.create')}
                                    className="rounded-lg bg-yellow-500 px-4 py-2 font-bold text-red-800 transition-all hover:scale-105 hover:bg-yellow-400"
                                >
                                    ➕ Add Question
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="mx-auto max-w-6xl px-6 py-12">
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-6xl font-bold text-yellow-300 drop-shadow-lg">
                            🧠 Manage Trivia Questions
                        </h1>
                        <p className="text-xl text-white">
                            Create and manage Super Mario trivia questions for the game
                        </p>
                    </div>

                    {/* Questions List */}
                    {questions.data.length > 0 ? (
                        <div className="space-y-6">
                            {questions.data.map((question, index) => (
                                <div key={question.id} className="rounded-2xl bg-white p-8 shadow-2xl">
                                    <div className="mb-6 flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="mb-2 flex items-center gap-4">
                                                <span className="text-2xl font-bold text-gray-400">
                                                    Q{(questions.current_page - 1) * 15 + index + 1}
                                                </span>
                                                <span className={`rounded-full px-3 py-1 text-sm font-bold ${getDifficultyColor(question.difficulty)}`}>
                                                    {getDifficultyStars(question.difficulty)} {question.difficulty.toUpperCase()}
                                                </span>
                                            </div>
                                            <h2 className="mb-4 text-xl font-bold text-gray-800">
                                                {question.question}
                                            </h2>
                                        </div>
                                        <div className="flex gap-2">
                                            <Link
                                                href={route('trivia-questions.show', question.id)}
                                                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-blue-400"
                                            >
                                                👁️ View
                                            </Link>
                                            <Link
                                                href={route('trivia-questions.edit', question.id)}
                                                className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-bold text-red-800 transition-all hover:scale-105 hover:bg-yellow-400"
                                            >
                                                ✏️ Edit
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Answer Options Preview */}
                                    <div className="grid gap-2 md:grid-cols-2">
                                        {question.options.map((option, optionIndex) => (
                                            <div 
                                                key={optionIndex}
                                                className={`rounded-lg p-3 text-sm ${
                                                    optionIndex === question.correct_answer_index
                                                        ? 'bg-green-100 font-bold text-green-800 border-2 border-green-300'
                                                        : 'bg-gray-100 text-gray-700'
                                                }`}
                                            >
                                                <span className="mr-2 font-bold">
                                                    {String.fromCharCode(65 + optionIndex)}.
                                                </span>
                                                {option}
                                                {optionIndex === question.correct_answer_index && (
                                                    <span className="ml-2">✅</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Question Meta */}
                                    <div className="mt-4 text-sm text-gray-500">
                                        Added: {new Date(question.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl bg-white p-12 text-center shadow-2xl">
                            <div className="mb-6 text-8xl">🤔</div>
                            <h2 className="mb-4 text-3xl font-bold text-gray-600">No Questions Yet!</h2>
                            <p className="mb-8 text-lg text-gray-500">
                                Create your first trivia question to get the game started.
                            </p>
                            <Link 
                                href={route('trivia-questions.create')}
                                className="inline-block rounded-xl bg-purple-600 px-12 py-4 text-xl font-bold text-white transition-all hover:scale-105 hover:bg-purple-500"
                            >
                                ➕ Create First Question
                            </Link>
                        </div>
                    )}

                    {/* Pagination */}
                    {questions.last_page > 1 && (
                        <div className="mt-12 flex justify-center">
                            <nav className="flex gap-2">
                                {questions.links.map((link, index) => (
                                    <div key={index}>
                                        {link.url ? (
                                            <Link
                                                href={link.url}
                                                className={`rounded-lg px-4 py-2 font-bold transition-all ${
                                                    link.active
                                                        ? 'bg-yellow-500 text-red-800'
                                                        : 'bg-white text-purple-600 hover:bg-purple-50'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span 
                                                className="rounded-lg bg-gray-300 px-4 py-2 font-bold text-gray-500"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </nav>
                        </div>
                    )}

                    {/* Quick Stats */}
                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        <div className="rounded-2xl bg-white bg-opacity-20 p-6 text-center backdrop-blur-sm">
                            <div className="text-3xl font-bold text-white">{questions.data.length}</div>
                            <div className="text-white">Questions on This Page</div>
                        </div>
                        <div className="rounded-2xl bg-white bg-opacity-20 p-6 text-center backdrop-blur-sm">
                            <div className="text-3xl font-bold text-white">
                                {questions.data.filter(q => q.difficulty === 'easy').length}
                            </div>
                            <div className="text-white">Easy Questions</div>
                        </div>
                        <div className="rounded-2xl bg-white bg-opacity-20 p-6 text-center backdrop-blur-sm">
                            <div className="text-3xl font-bold text-white">
                                {questions.data.filter(q => q.difficulty === 'hard').length}
                            </div>
                            <div className="text-white">Hard Questions</div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}