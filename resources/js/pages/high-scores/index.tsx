import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface HighScore {
    id: number;
    player_name: string;
    score: number;
    total_questions: number;
    correct_answers: number;
    accuracy: number;
    created_at: string;
}

interface Props {
    high_scores: HighScore[];
    [key: string]: unknown;
}

export default function HighScoresIndex({ high_scores }: Props) {
    const getRankEmoji = (index: number) => {
        if (index === 0) return '🥇';
        if (index === 1) return '🥈';
        if (index === 2) return '🥉';
        return `#${index + 1}`;
    };

    const getScoreColor = (score: number, maxScore: number) => {
        const percentage = (score / maxScore) * 100;
        if (percentage >= 90) return 'text-yellow-600';
        if (percentage >= 75) return 'text-green-600';
        if (percentage >= 50) return 'text-blue-600';
        return 'text-gray-600';
    };

    return (
        <>
            <Head title="🏆 High Scores - Super Mario Trivia" />
            <div className="min-h-screen bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600">
                {/* Header */}
                <header className="bg-white bg-opacity-20 backdrop-blur-sm">
                    <div className="mx-auto max-w-6xl px-6 py-4">
                        <div className="flex items-center justify-between">
                            <Link href={route('home')} className="flex items-center gap-2 text-white hover:text-yellow-300">
                                <span className="text-2xl">🏠</span>
                                <span className="font-bold">Home</span>
                            </Link>
                            <nav className="flex items-center gap-4">
                                <Link 
                                    href={route('characters.index')}
                                    className="rounded-lg bg-red-500 px-4 py-2 font-bold text-white transition-all hover:scale-105 hover:bg-red-400"
                                >
                                    👥 Characters
                                </Link>
                                <Link 
                                    href={route('trivia.index')}
                                    className="rounded-lg bg-green-500 px-4 py-2 font-bold text-white transition-all hover:scale-105 hover:bg-green-400"
                                >
                                    🧠 Play Trivia
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="mx-auto max-w-4xl px-6 py-12">
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-6xl font-bold text-red-800 drop-shadow-lg">
                            🏆 High Scores
                        </h1>
                        <p className="text-xl text-white">
                            The greatest Super Mario trivia champions!
                        </p>
                    </div>

                    {/* High Scores List */}
                    {high_scores.length > 0 ? (
                        <div className="rounded-3xl bg-white p-8 shadow-2xl">
                            <div className="space-y-4">
                                {high_scores.map((score, index) => (
                                    <div 
                                        key={score.id}
                                        className={`flex items-center rounded-2xl p-6 transition-all hover:scale-102 ${
                                            index < 3 ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 shadow-lg' : 'bg-gray-50'
                                        }`}
                                    >
                                        {/* Rank */}
                                        <div className="mr-6 text-center">
                                            <div className="text-3xl font-bold">
                                                {getRankEmoji(index)}
                                            </div>
                                        </div>

                                        {/* Player Info */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4">
                                                <h3 className="text-xl font-bold text-gray-800">
                                                    {score.player_name}
                                                </h3>
                                                <div className="text-sm text-gray-500">
                                                    {new Date(score.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div className="mt-2 flex items-center gap-6 text-sm text-gray-600">
                                                <span>
                                                    {score.correct_answers}/{score.total_questions} correct
                                                </span>
                                                <span>
                                                    {Math.round((score.correct_answers / score.total_questions) * 100)}% accuracy
                                                </span>
                                            </div>
                                        </div>

                                        {/* Score */}
                                        <div className="text-right">
                                            <div className={`text-3xl font-bold ${getScoreColor(score.score, score.total_questions * 10)}`}>
                                                {score.score}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                / {score.total_questions * 10} pts
                                            </div>
                                        </div>

                                        {/* View Details Link */}
                                        <div className="ml-4">
                                            <Link
                                                href={route('high-scores.show', score.id)}
                                                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-blue-400"
                                            >
                                                👁️ View
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Stats Summary */}
                            <div className="mt-8 grid gap-4 md:grid-cols-3">
                                <div className="rounded-xl bg-yellow-50 p-6 text-center">
                                    <div className="text-3xl font-bold text-yellow-600">
                                        {high_scores[0]?.score || 0}
                                    </div>
                                    <div className="text-sm text-gray-600">Highest Score</div>
                                </div>
                                <div className="rounded-xl bg-green-50 p-6 text-center">
                                    <div className="text-3xl font-bold text-green-600">
                                        {high_scores.length}
                                    </div>
                                    <div className="text-sm text-gray-600">Total Players</div>
                                </div>
                                <div className="rounded-xl bg-blue-50 p-6 text-center">
                                    <div className="text-3xl font-bold text-blue-600">
                                        {high_scores.length > 0 
                                            ? Math.round(high_scores.reduce((acc, score) => acc + (score.correct_answers / score.total_questions), 0) / high_scores.length * 100)
                                            : 0}%
                                    </div>
                                    <div className="text-sm text-gray-600">Avg Accuracy</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-3xl bg-white p-12 text-center shadow-2xl">
                            <div className="mb-6 text-8xl">🤷‍♂️</div>
                            <h2 className="mb-4 text-3xl font-bold text-gray-600">No High Scores Yet!</h2>
                            <p className="mb-8 text-lg text-gray-500">
                                Be the first to play the trivia game and set a high score!
                            </p>
                            <Link 
                                href={route('trivia.index')}
                                className="inline-block rounded-xl bg-green-600 px-12 py-4 text-xl font-bold text-white transition-all hover:scale-105 hover:bg-green-500"
                            >
                                🚀 Start Playing
                            </Link>
                        </div>
                    )}

                    {/* Call to Action */}
                    <div className="mt-12 text-center">
                        <div className="rounded-2xl bg-white bg-opacity-20 p-8 backdrop-blur-sm">
                            <h2 className="mb-4 text-2xl font-bold text-white">
                                Think You Can Beat These Scores? 🎯
                            </h2>
                            <Link 
                                href={route('trivia.index')}
                                className="inline-block rounded-xl bg-green-600 px-10 py-4 text-xl font-bold text-white transition-all hover:scale-105 hover:bg-green-500"
                            >
                                🧠 Challenge Yourself
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}