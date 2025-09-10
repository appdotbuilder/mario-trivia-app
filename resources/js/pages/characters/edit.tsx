import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

interface Character {
    id: number;
    name: string;
    description: string;
    image_url?: string;
}

interface Props {
    character: Character;
    [key: string]: unknown;
}

export default function CharacterEdit({ character }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: character.name,
        description: character.description,
        image_url: character.image_url || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('characters.update', character.id));
    };

    return (
        <>
            <Head title={`🍄 Edit ${character.name} - Super Mario Character`} />
            <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600">
                {/* Header */}
                <header className="bg-white bg-opacity-20 backdrop-blur-sm">
                    <div className="mx-auto max-w-4xl px-6 py-4">
                        <div className="flex items-center justify-between">
                            <Link href={route('characters.show', character.id)} className="flex items-center gap-2 text-white hover:text-yellow-300">
                                <span className="text-2xl">←</span>
                                <span className="font-bold">Back to {character.name}</span>
                            </Link>
                            <Link 
                                href={route('characters.index')}
                                className="rounded-lg border-2 border-white px-4 py-2 font-bold text-white transition-all hover:bg-white hover:text-blue-600"
                            >
                                👥 All Characters
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="mx-auto max-w-2xl px-6 py-12">
                    <div className="rounded-3xl bg-white p-12 shadow-2xl">
                        <div className="mb-8 text-center">
                            <div className="mb-4 text-6xl">
                                {character.name === 'Mario' && '🔴'}
                                {character.name === 'Luigi' && '🟢'}
                                {character.name === 'Princess Peach' && '👑'}
                                {character.name === 'Bowser' && '🐢'}
                                {character.name === 'Yoshi' && '🦕'}
                                {character.name === 'Toad' && '🍄'}
                                {!['Mario', 'Luigi', 'Princess Peach', 'Bowser', 'Yoshi', 'Toad'].includes(character.name) && '⭐'}
                            </div>
                            <h1 className="mb-4 text-4xl font-bold text-red-600">
                                ✏️ Edit {character.name}
                            </h1>
                            <p className="text-lg text-gray-600">
                                Update the character information below
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Character Name */}
                            <div>
                                <label htmlFor="name" className="mb-2 block text-lg font-bold text-gray-800">
                                    🏷️ Character Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-lg transition-colors focus:border-blue-500 focus:outline-none"
                                    placeholder="e.g., Mario, Luigi, Bowser..."
                                    required
                                />
                                {errors.name && (
                                    <p className="mt-2 text-sm font-semibold text-red-600">❌ {errors.name}</p>
                                )}
                            </div>

                            {/* Character Description */}
                            <div>
                                <label htmlFor="description" className="mb-2 block text-lg font-bold text-gray-800">
                                    📖 Description
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                    className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-lg transition-colors focus:border-blue-500 focus:outline-none"
                                    placeholder="Tell us about this character..."
                                    required
                                />
                                {errors.description && (
                                    <p className="mt-2 text-sm font-semibold text-red-600">❌ {errors.description}</p>
                                )}
                            </div>

                            {/* Image URL */}
                            <div>
                                <label htmlFor="image_url" className="mb-2 block text-lg font-bold text-gray-800">
                                    🖼️ Image URL <span className="text-sm font-normal text-gray-500">(Optional)</span>
                                </label>
                                <input
                                    type="url"
                                    id="image_url"
                                    value={data.image_url}
                                    onChange={(e) => setData('image_url', e.target.value)}
                                    className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-lg transition-colors focus:border-blue-500 focus:outline-none"
                                    placeholder="https://example.com/character-image.png"
                                />
                                {errors.image_url && (
                                    <p className="mt-2 text-sm font-semibold text-red-600">❌ {errors.image_url}</p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-6">
                                <Link
                                    href={route('characters.show', character.id)}
                                    className="flex-1 rounded-xl bg-gray-500 py-4 text-center text-lg font-bold text-white transition-all hover:scale-105 hover:bg-gray-400"
                                >
                                    ❌ Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 rounded-xl bg-green-600 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:bg-green-500 disabled:opacity-50"
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