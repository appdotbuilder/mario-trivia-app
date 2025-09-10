import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

interface TriviaQuestion {
    id: number;
    question: string;
    options: string[];
    difficulty: string;
}

interface Props {
    questions: TriviaQuestion[];
    message?: string;
    [key: string]: unknown;
}

export default function TriviaIndex({ questions, message }: Props) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [playerName, setPlayerName] = useState('');

    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions.length;

    const handleAnswerSelect = (answerIndex: number) => {
        if (selectedAnswer === null) {
            setSelectedAnswer(answerIndex);
            
            // Submit answer to backend to check if correct
            router.post(route('trivia.store'), {
                question_id: currentQuestion.id,
                answer_index: answerIndex,
            }, {
                onSuccess: (page) => {
                    const result = page.props as { is_correct?: boolean };
                    setShowResult(true);
                    
                    if (result.is_correct) {
                        setScore(score + 10);
                        setCorrectAnswers(correctAnswers + 1);
                    }
                    
                    // Auto-advance after showing result
                    setTimeout(() => {
                        if (currentQuestionIndex < totalQuestions - 1) {
                            setCurrentQuestionIndex(currentQuestionIndex + 1);
                            setSelectedAnswer(null);
                            setShowResult(false);
                        } else {
                            // Game completed
                            setGameCompleted(true);
                        }
                    }, 2000);
                }
            });
        }
    };

    const handleGameComplete = () => {
        if (playerName.trim()) {
            router.post(route('trivia.complete'), {
                player_name: playerName,
                score: score,
                total_questions: totalQuestions,
                correct_answers: correctAnswers,
            });
        }
    };

    const restartGame = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setScore(0);
        setCorrectAnswers(0);
        setShowResult(false);
        setGameStarted(false);
        setGameCompleted(false);
        setPlayerName('');
    };

    if (questions.length === 0) {
        return (
            <>
                <Head title="🧠 Super Mario Trivia Game" />
                <div className="min-h-screen bg-gradient-to-b from-green-400 via-green-500 to-green-600">
                    {/* Header */}
                    <header className="bg-white bg-opacity-20 backdrop-blur-sm">
                        <div className="mx-auto max-w-4xl px-6 py-4">
                            <Link href={route('home')} className="flex items-center gap-2 text-white hover:text-yellow-300">
                                <span className="text-2xl">🏠</span>
                                <span className="font-bold">Home</span>
                            </Link>
                        </div>
                    </header>

                    <main className="mx-auto max-w-2xl px-6 py-12">
                        <div className="rounded-3xl bg-white p-12 text-center shadow-2xl">
                            <div className="mb-6 text-8xl">🤔</div>
                            <h1 className="mb-4 text-3xl font-bold text-red-600">No Questions Available</h1>
                            <p className="mb-8 text-lg text-gray-600">{message}</p>
                            <Link 
                                href={route('home')}
                                className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-bold text-white transition-all hover:scale-105 hover:bg-blue-500"
                            >
                                🏠 Go Home
                            </Link>
                        </div>
                    </main>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="🧠 Super Mario Trivia Game" />
            <div className="min-h-screen bg-gradient-to-b from-green-400 via-green-500 to-green-600">
                {/* Header */}
                <header className="bg-white bg-opacity-20 backdrop-blur-sm">
                    <div className="mx-auto max-w-4xl px-6 py-4">
                        <div className="flex items-center justify-between">
                            <Link href={route('home')} className="flex items-center gap-2 text-white hover:text-yellow-300">
                                <span className="text-2xl">🏠</span>
                                <span className="font-bold">Home</span>
                            </Link>
                            {gameStarted && !gameCompleted && (
                                <div className="text-white">
                                    <span className="font-bold">Score: {score} | Question {currentQuestionIndex + 1}/{totalQuestions}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="mx-auto max-w-4xl px-6 py-12">
                    {!gameStarted ? (
                        /* Game Start Screen */
                        <div className="rounded-3xl bg-white p-12 text-center shadow-2xl">
                            <div className="mb-6 text-8xl">🧠</div>
                            <h1 className="mb-4 text-5xl font-bold text-green-600">Super Mario Trivia</h1>
                            <p className="mb-8 text-lg text-gray-600">
                                Test your knowledge of the Super Mario universe! Answer {totalQuestions} questions and see how well you know Mario and friends.
                            </p>
                            <div className="mb-8 grid gap-4 md:grid-cols-3">
                                <div className="rounded-xl bg-green-50 p-4">
                                    <div className="text-2xl font-bold text-green-600">{totalQuestions}</div>
                                    <div className="text-sm text-gray-600">Questions</div>
                                </div>
                                <div className="rounded-xl bg-blue-50 p-4">
                                    <div className="text-2xl font-bold text-blue-600">10pts</div>
                                    <div className="text-sm text-gray-600">Per Correct Answer</div>
                                </div>
                                <div className="rounded-xl bg-yellow-50 p-4">
                                    <div className="text-2xl font-bold text-yellow-600">{totalQuestions * 10}</div>
                                    <div className="text-sm text-gray-600">Max Score</div>
                                </div>
                            </div>
                            <button
                                onClick={() => setGameStarted(true)}
                                className="rounded-xl bg-green-600 px-12 py-4 text-xl font-bold text-white transition-all hover:scale-105 hover:bg-green-500"
                            >
                                🚀 Start Game
                            </button>
                        </div>
                    ) : gameCompleted ? (
                        /* Game Complete Screen */
                        <div className="rounded-3xl bg-white p-12 text-center shadow-2xl">
                            <div className="mb-6 text-8xl">🎉</div>
                            <h1 className="mb-4 text-4xl font-bold text-green-600">Game Complete!</h1>
                            <div className="mb-8">
                                <div className="mb-6 text-6xl font-bold text-blue-600">{score} / {totalQuestions * 10}</div>
                                <p className="text-lg text-gray-600">
                                    You got {correctAnswers} out of {totalQuestions} questions correct!
                                </p>
                                <p className="text-lg font-bold text-gray-800">
                                    Accuracy: {Math.round((correctAnswers / totalQuestions) * 100)}%
                                </p>
                            </div>
                            
                            {!playerName ? (
                                <div className="mb-6">
                                    <h3 className="mb-4 text-xl font-bold text-gray-800">Save Your Score!</h3>
                                    <input
                                        type="text"
                                        value={playerName}
                                        onChange={(e) => setPlayerName(e.target.value)}
                                        placeholder="Enter your name..."
                                        className="mb-4 rounded-lg border-2 border-gray-300 px-4 py-2 text-lg focus:border-green-500 focus:outline-none"
                                    />
                                    <button
                                        onClick={handleGameComplete}
                                        className="ml-4 rounded-lg bg-yellow-500 px-6 py-2 font-bold text-red-800 transition-all hover:scale-105 hover:bg-yellow-400"
                                    >
                                        💾 Save Score
                                    </button>
                                </div>
                            ) : null}
                            
                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={restartGame}
                                    className="rounded-xl bg-green-600 px-8 py-3 font-bold text-white transition-all hover:scale-105 hover:bg-green-500"
                                >
                                    🔄 Play Again
                                </button>
                                <Link
                                    href={route('high-scores.index')}
                                    className="rounded-xl bg-yellow-500 px-8 py-3 font-bold text-red-800 transition-all hover:scale-105 hover:bg-yellow-400"
                                >
                                    🏆 View High Scores
                                </Link>
                            </div>
                        </div>
                    ) : (
                        /* Game Question Screen */
                        <div className="rounded-3xl bg-white p-12 shadow-2xl">
                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="mb-2 flex justify-between text-sm font-semibold text-gray-600">
                                    <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                                    <span>Score: {score}</span>
                                </div>
                                <div className="h-2 rounded-full bg-gray-200">
                                    <div 
                                        className="h-2 rounded-full bg-green-500 transition-all duration-300"
                                        style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Question */}
                            <div className="mb-8 text-center">
                                <div className="mb-4 text-4xl">
                                    {currentQuestion.difficulty === 'easy' && '⭐'}
                                    {currentQuestion.difficulty === 'medium' && '⭐⭐'}
                                    {currentQuestion.difficulty === 'hard' && '⭐⭐⭐'}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                                    {currentQuestion.question}
                                </h2>
                            </div>

                            {/* Answer Options */}
                            <div className="space-y-4">
                                {currentQuestion.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerSelect(index)}
                                        disabled={selectedAnswer !== null}
                                        className={`w-full rounded-xl p-6 text-left text-lg font-semibold transition-all ${
                                            selectedAnswer === null
                                                ? 'bg-gray-100 hover:bg-blue-100 hover:scale-105'
                                                : selectedAnswer === index
                                                ? showResult ? 'bg-blue-500 text-white' : 'bg-blue-200'
                                                : 'bg-gray-100 opacity-50'
                                        }`}
                                    >
                                        <span className="mr-4 text-xl">
                                            {String.fromCharCode(65 + index)}
                                        </span>
                                        {option}
                                    </button>
                                ))}
                            </div>

                            {/* Result Feedback */}
                            {showResult && (
                                <div className="mt-8 text-center">
                                    <div className="text-4xl mb-2">
                                        {/* Result will be shown based on backend response */}
                                    </div>
                                    <p className="text-lg text-gray-600">
                                        Moving to next question...
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}