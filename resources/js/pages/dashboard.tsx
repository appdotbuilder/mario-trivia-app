import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="🏰 Super Mario Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 p-6 overflow-x-auto">
                {/* Header */}
                <div className="text-center">
                    <h1 className="mb-4 text-5xl font-bold text-red-600">
                        🏰 Super Mario Admin Dashboard
                    </h1>
                    <p className="text-lg text-gray-600">
                        Manage your Super Mario universe content
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-2xl bg-white p-6 shadow-lg">
                        <div className="mb-2 text-4xl text-red-500">👥</div>
                        <h3 className="text-xl font-bold text-gray-800">Characters</h3>
                        <p className="text-gray-600">Manage Super Mario characters</p>
                        <div className="mt-4 flex gap-2">
                            <Link 
                                href={route('characters.index')}
                                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-blue-400"
                            >
                                👁️ View All
                            </Link>
                            <Link 
                                href={route('characters.create')}
                                className="rounded-lg bg-green-500 px-4 py-2 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-green-400"
                            >
                                ➕ Add New
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-lg">
                        <div className="mb-2 text-4xl text-green-500">🧠</div>
                        <h3 className="text-xl font-bold text-gray-800">Trivia Questions</h3>
                        <p className="text-gray-600">Manage trivia game questions</p>
                        <div className="mt-4 flex gap-2">
                            <Link 
                                href={route('trivia-questions.index')}
                                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-blue-400"
                            >
                                👁️ View All
                            </Link>
                            <Link 
                                href={route('trivia-questions.create')}
                                className="rounded-lg bg-green-500 px-4 py-2 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-green-400"
                            >
                                ➕ Add New
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-lg">
                        <div className="mb-2 text-4xl text-yellow-500">🏆</div>
                        <h3 className="text-xl font-bold text-gray-800">High Scores</h3>
                        <p className="text-gray-600">View player achievements</p>
                        <div className="mt-4">
                            <Link 
                                href={route('high-scores.index')}
                                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-blue-400"
                            >
                                👁️ View All
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Action Cards */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl bg-gradient-to-r from-red-500 to-red-600 p-8 text-white shadow-lg">
                        <div className="mb-4 text-6xl">🎮</div>
                        <h2 className="mb-2 text-2xl font-bold">Game Management</h2>
                        <p className="mb-6 text-red-100">
                            Add characters and create engaging trivia questions for players to enjoy.
                        </p>
                        <div className="flex gap-4">
                            <Link 
                                href={route('characters.create')}
                                className="rounded-lg bg-white px-6 py-3 font-bold text-red-600 transition-all hover:scale-105"
                            >
                                👥 Add Character
                            </Link>
                            <Link 
                                href={route('trivia-questions.create')}
                                className="rounded-lg bg-red-400 px-6 py-3 font-bold text-white transition-all hover:scale-105 hover:bg-red-300"
                            >
                                🧠 Add Question
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-r from-green-500 to-green-600 p-8 text-white shadow-lg">
                        <div className="mb-4 text-6xl">📊</div>
                        <h2 className="mb-2 text-2xl font-bold">Player Engagement</h2>
                        <p className="mb-6 text-green-100">
                            Monitor high scores and see how players are engaging with your content.
                        </p>
                        <div className="flex gap-4">
                            <Link 
                                href={route('high-scores.index')}
                                className="rounded-lg bg-white px-6 py-3 font-bold text-green-600 transition-all hover:scale-105"
                            >
                                🏆 View Scores
                            </Link>
                            <Link 
                                href={route('trivia.index')}
                                className="rounded-lg bg-green-400 px-6 py-3 font-bold text-white transition-all hover:scale-105 hover:bg-green-300"
                            >
                                🎯 Test Game
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="rounded-2xl bg-white p-8 shadow-lg">
                    <h2 className="mb-6 text-2xl font-bold text-gray-800 text-center">
                        🚀 Quick Actions
                    </h2>
                    <div className="grid gap-4 md:grid-cols-4">
                        <Link 
                            href={route('home')}
                            className="rounded-xl bg-blue-100 p-6 text-center transition-all hover:scale-105 hover:bg-blue-200"
                        >
                            <div className="mb-2 text-3xl">🏠</div>
                            <div className="font-bold text-blue-800">Home Page</div>
                        </Link>
                        
                        <Link 
                            href={route('characters.index')}
                            className="rounded-xl bg-red-100 p-6 text-center transition-all hover:scale-105 hover:bg-red-200"
                        >
                            <div className="mb-2 text-3xl">👥</div>
                            <div className="font-bold text-red-800">All Characters</div>
                        </Link>
                        
                        <Link 
                            href={route('trivia-questions.index')}
                            className="rounded-xl bg-green-100 p-6 text-center transition-all hover:scale-105 hover:bg-green-200"
                        >
                            <div className="mb-2 text-3xl">🧠</div>
                            <div className="font-bold text-green-800">All Questions</div>
                        </Link>
                        
                        <Link 
                            href={route('high-scores.index')}
                            className="rounded-xl bg-yellow-100 p-6 text-center transition-all hover:scale-105 hover:bg-yellow-200"
                        >
                            <div className="mb-2 text-3xl">🏆</div>
                            <div className="font-bold text-yellow-800">High Scores</div>
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-gray-600">
                    <p className="text-lg">
                        🍄 Welcome to the Super Mario Universe Admin Panel! 🍄
                    </p>
                    <p className="text-sm">
                        Create amazing content for your players to enjoy!
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}