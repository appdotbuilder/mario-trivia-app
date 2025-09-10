import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

interface Character {
    id: number;
    name: string;
    description: string;
    image_url?: string;
    created_at: string;
}

interface Props {
    characters: {
        data: Character[];
        current_page: number;
        last_page: number;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    [key: string]: unknown;
}

export default function CharactersIndex({ characters }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="🍄 Super Mario Characters" />
            <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600">
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
                                    href={route('trivia.index')}
                                    className="rounded-lg bg-green-500 px-4 py-2 font-bold text-white transition-all hover:scale-105 hover:bg-green-400"
                                >
                                    🧠 Trivia
                                </Link>
                                <Link 
                                    href={route('high-scores.index')}
                                    className="rounded-lg bg-yellow-500 px-4 py-2 font-bold text-red-800 transition-all hover:scale-105 hover:bg-yellow-400"
                                >
                                    🏆 High Scores
                                </Link>
                                {auth.user && (
                                    <Link 
                                        href={route('characters.create')}
                                        className="rounded-lg bg-red-500 px-4 py-2 font-bold text-white transition-all hover:scale-105 hover:bg-red-400"
                                    >
                                        ➕ Add Character
                                    </Link>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="mx-auto max-w-6xl px-6 py-12">
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-6xl font-bold text-yellow-300 drop-shadow-lg">
                            👥 Super Mario Characters
                        </h1>
                        <p className="text-xl text-white">
                            Meet all the iconic characters from the Super Mario universe!
                        </p>
                    </div>

                    {/* Characters Grid */}
                    {characters.data.length > 0 ? (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {characters.data.map((character) => (
                                <div key={character.id} className="group rounded-2xl bg-white p-8 shadow-2xl transition-all hover:scale-105">
                                    <div className="mb-6 text-center text-8xl">
                                        {character.name === 'Mario' && '🔴'}
                                        {character.name === 'Luigi' && '🟢'}
                                        {character.name === 'Princess Peach' && '👑'}
                                        {character.name === 'Bowser' && '🐢'}
                                        {character.name === 'Yoshi' && '🦕'}
                                        {character.name === 'Toad' && '🍄'}
                                        {!['Mario', 'Luigi', 'Princess Peach', 'Bowser', 'Yoshi', 'Toad'].includes(character.name) && '⭐'}
                                    </div>
                                    
                                    <h2 className="mb-4 text-center text-2xl font-bold text-red-600">
                                        {character.name}
                                    </h2>
                                    
                                    <p className="mb-6 text-gray-600 line-clamp-4">
                                        {character.description}
                                    </p>
                                    
                                    <div className="flex gap-2">
                                        <Link
                                            href={route('characters.show', character.id)}
                                            className="flex-1 rounded-lg bg-blue-600 py-3 text-center font-bold text-white transition-all hover:bg-blue-500"
                                        >
                                            👁️ View Details
                                        </Link>
                                        
                                        {auth.user && (
                                            <Link
                                                href={route('characters.edit', character.id)}
                                                className="rounded-lg bg-yellow-500 px-4 py-3 font-bold text-red-800 transition-all hover:bg-yellow-400"
                                            >
                                                ✏️
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl bg-white p-12 text-center shadow-2xl">
                            <div className="mb-4 text-6xl">😅</div>
                            <h2 className="mb-4 text-2xl font-bold text-gray-600">No Characters Yet!</h2>
                            <p className="mb-6 text-gray-500">
                                Looks like we need to add some Super Mario characters to get started.
                            </p>
                            {auth.user && (
                                <Link 
                                    href={route('characters.create')}
                                    className="inline-block rounded-lg bg-red-600 px-8 py-3 font-bold text-white transition-all hover:scale-105 hover:bg-red-500"
                                >
                                    ➕ Add First Character
                                </Link>
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    {characters.last_page > 1 && (
                        <div className="mt-12 flex justify-center">
                            <nav className="flex gap-2">
                                {characters.links.map((link, index) => (
                                    <div key={index}>
                                        {link.url ? (
                                            <Link
                                                href={link.url}
                                                className={`rounded-lg px-4 py-2 font-bold transition-all ${
                                                    link.active
                                                        ? 'bg-yellow-500 text-red-800'
                                                        : 'bg-white text-blue-600 hover:bg-blue-50'
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
                </main>
            </div>
        </>
    );
}