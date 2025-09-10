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
    high_score: HighScore;
    [key: string]: unknown;
}

export default function HighScoreShow({ high_score }: Props) {
    const getPerformanceLevel = () => {
        const percentage = (high_score.correct_answers / high_score.total_questions) * 100;
        if (percentage === 100) return { level: 'Perfect!', emoji: '🏆', color: 'text-yellow-600' };
        if (percentage >= 90) return { level: 'Excellent!', emoji: '🌟', color: 'text-yellow-500' };
        if (percentage >= 75) return { level: 'Great!', emoji: '👏', color: 'text-green-600' };
        if (percentage >= 50) return { level: 'Good!', emoji: '👍', color: 'text-blue-600' };
        return { level: 'Keep Trying!', emoji: '💪', color: 'text-gray-600' };
    };

    const performance = getPerformanceLevel();
    const percentage = Math.round((high_score.correct_answers / high_score.total_questions) * 100);

    return (
        <>
            <Head title={`🏆 ${high_score.player_name}'s Score - Super Mario Trivia`} />
            <div className="min-h-screen bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600">
                {/* Header */}
                <header className="bg-white bg-opacity-20 backdrop-blur-sm">
                    <div className="mx-auto max-w-4xl px-6 py-4">
                        <div className="flex items-center justify-between">
                            <Link href={route('high-scores.index')} className="flex items-center gap-2 text-white hover:text-yellow-300">
                                <span className="text-2xl">←</span>
                                <span className="font-bold">All High Scores</span>
                            </Link>
                            <nav className="flex items-center gap-4">
                                <Link 
                                    href={route('home')}
                                    className="rounded-lg border-2 border-white px-4 py-2 font-bold text-white transition-all hover:bg-white hover:text-yellow-600"
                                >
                                    🏠 Home
                                </Link>
                                <Link 
                                    href={route('trivia.index')}
                                    className="rounded-lg bg-green-500 px-4 py-2 font-bold text-white transition-all hover:scale-105 hover:bg-green-400"
                                >
                                    🧠 Play Again
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="mx-auto max-w-3xl px-6 py-12">
                    <div className="rounded-3xl bg-white p-12 shadow-2xl">
                        {/* Player Header */}
                        <div className="mb-8 text-center">
                            <div className="mb-4 text-8xl">{performance.emoji}</div>
                            <h1 className="mb-2 text-4xl font-bold text-red-600">
                                {high_score.player_name}
                            </h1>
                            <p className="text-lg text-gray-600">
                                Trivia Champion
                            </p>
                        </div>

                        {/* Score Display */}
                        <div className="mb-8 text-center">
                            <div className="mb-4 text-7xl font-bold text-yellow-600">
                                {high_score.score}
                            </div>
                            <div className="text-2xl text-gray-600">
                                out of {high_score.total_questions * 10} points
                            </div>
                            <div className={`mt-2 text-xl font-bold ${performance.color}`}>
                                {performance.level}
                            </div>
                        </div>

                        {/* Performance Stats */}
                        <div className="mb-8 grid gap-6 md:grid-cols-2">
                            <div className="rounded-2xl bg-blue-50 p-8 text-center">
                                <div className="mb-2 text-4xl font-bold text-blue-600">
                                    {high_score.correct_answers}
                                </div>
                                <div className="text-lg text-gray-600">Correct Answers</div>
                                <div className="text-sm text-gray-500">
                                    out of {high_score.total_questions} questions
                                </div>
                            </div>
                            
                            <div className="rounded-2xl bg-green-50 p-8 text-center">
                                <div className="mb-2 text-4xl font-bold text-green-600">
                                    {percentage}%
                                </div>
                                <div className="text-lg text-gray-600">Accuracy</div>
                                <div className="text-sm text-gray-500">
                                    {high_score.total_questions - high_score.correct_answers} wrong answers
                                </div>
                            </div>
                        </div>

                        {/* Achievement Badges */}
                        <div className="mb-8">
                            <h2 className="mb-4 text-2xl font-bold text-gray-800 text-center">
                                🏅 Achievements
                            </h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                {percentage === 100 && (
                                    <div className="rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 p-4 text-center text-white">
                                        <div className="text-2xl">🏆</div>
                                        <div className="font-bold">Perfect Score!</div>
                                    </div>
                                )}
                                {percentage >= 90 && (
                                    <div className="rounded-xl bg-gradient-to-r from-green-400 to-green-500 p-4 text-center text-white">
                                        <div className="text-2xl">⭐</div>
                                        <div className="font-bold">Master Level</div>
                                    </div>
                                )}
                                {high_score.correct_answers >= 5 && (
                                    <div className="rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 p-4 text-center text-white">
                                        <div className="text-2xl">🎯</div>
                                        <div className="font-bold">Sharp Shooter</div>
                                    </div>
                                )}
                                {high_score.total_questions >= 10 && (
                                    <div className="rounded-xl bg-gradient-to-r from-purple-400 to-purple-500 p-4 text-center text-white">
                                        <div className="text-2xl">💪</div>
                                        <div className="font-bold">Marathon Player</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Game Details */}
                        <div className="mb-8">
                            <h2 className="mb-4 text-2xl font-bold text-gray-800 text-center">
                                📊 Game Details
                            </h2>
                            <div className="rounded-2xl bg-gray-50 p-6">
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-gray-800">Date Played</div>
                                        <div className="text-gray-600">
                                            {new Date(high_score.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-gray-800">Total Questions</div>
                                        <div className="text-gray-600">{high_score.total_questions}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-gray-800">Points per Question</div>
                                        <div className="text-gray-600">10 points</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Link
                                href={route('trivia.index')}
                                className="flex-1 rounded-xl bg-green-600 py-4 text-center text-lg font-bold text-white transition-all hover:scale-105 hover:bg-green-500"
                            >
                                🎮 Play Again
                            </Link>
                            <Link
                                href={route('high-scores.index')}
                                className="flex-1 rounded-xl bg-yellow-500 py-4 text-center text-lg font-bold text-red-800 transition-all hover:scale-105 hover:bg-yellow-400"
                            >
                                🏆 View All Scores
                            </Link>
                            <Link
                                href={route('home')}
                                className="flex-1 rounded-xl bg-blue-600 py-4 text-center text-lg font-bold text-white transition-all hover:scale-105 hover:bg-blue-500"
                            >
                                🏠 Home
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}