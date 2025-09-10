import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

interface Character {
    id: number;
    name: string;
    description: string;
    image_url?: string;
    created_at: string;
}

interface Props {
    character: Character;
    [key: string]: unknown;
}

export default function CharacterShow({ character }: Props) {
    const { auth } = usePage<SharedData>().props;

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete ${character.name}? This action cannot be undone.`)) {
            router.delete(route('characters.destroy', character.id));
        }
    };

    return (
        <>
            <Head title={`🍄 ${character.name} - Super Mario Character`} />
            <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600">
                {/* Header */}
                <header className="bg-white bg-opacity-20 backdrop-blur-sm">
                    <div className="mx-auto max-w-4xl px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Link href={route('characters.index')} className="flex items-center gap-2 text-white hover:text-yellow-300">
                                    <span className="text-2xl">←</span>
                                    <span className="font-bold">All Characters</span>
                                </Link>
                            </div>
                            <nav className="flex items-center gap-4">
                                <Link 
                                    href={route('home')}
                                    className="rounded-lg border-2 border-white px-4 py-2 font-bold text-white transition-all hover:bg-white hover:text-blue-600"
                                >
                                    🏠 Home
                                </Link>
                                {auth.user && (
                                    <>
                                        <Link 
                                            href={route('characters.edit', character.id)}
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
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="mx-auto max-w-4xl px-6 py-12">
                    <div className="rounded-3xl bg-white p-12 shadow-2xl">
                        {/* Character Display */}
                        <div className="mb-8 text-center">
                            <div className="mb-6 text-9xl">
                                {character.name === 'Mario' && '🔴'}
                                {character.name === 'Luigi' && '🟢'}
                                {character.name === 'Princess Peach' && '👑'}
                                {character.name === 'Bowser' && '🐢'}
                                {character.name === 'Yoshi' && '🦕'}
                                {character.name === 'Toad' && '🍄'}
                                {!['Mario', 'Luigi', 'Princess Peach', 'Bowser', 'Yoshi', 'Toad'].includes(character.name) && '⭐'}
                            </div>
                            
                            <h1 className="mb-2 text-5xl font-bold text-red-600">
                                {character.name}
                            </h1>
                        </div>

                        {/* Character Description */}
                        <div className="mb-8">
                            <h2 className="mb-4 text-2xl font-bold text-gray-800">
                                📖 About {character.name}
                            </h2>
                            <div className="rounded-xl bg-gray-50 p-6">
                                <p className="text-lg leading-relaxed text-gray-700">
                                    {character.description}
                                </p>
                            </div>
                        </div>

                        {/* Character Details */}
                        <div className="mb-8">
                            <h2 className="mb-4 text-2xl font-bold text-gray-800">
                                ℹ️ Character Details
                            </h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-xl bg-blue-50 p-4">
                                    <div className="text-sm font-semibold text-blue-600">CHARACTER NAME</div>
                                    <div className="text-lg font-bold text-gray-800">{character.name}</div>
                                </div>
                                <div className="rounded-xl bg-green-50 p-4">
                                    <div className="text-sm font-semibold text-green-600">ADDED TO COLLECTION</div>
                                    <div className="text-lg font-bold text-gray-800">
                                        {new Date(character.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Link
                                href={route('characters.index')}
                                className="flex-1 rounded-xl bg-blue-600 py-4 text-center text-lg font-bold text-white transition-all hover:scale-105 hover:bg-blue-500"
                            >
                                👥 View All Characters
                            </Link>
                            
                            <Link
                                href={route('trivia.index')}
                                className="flex-1 rounded-xl bg-green-600 py-4 text-center text-lg font-bold text-white transition-all hover:scale-105 hover:bg-green-500"
                            >
                                🧠 Play Trivia Game
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}