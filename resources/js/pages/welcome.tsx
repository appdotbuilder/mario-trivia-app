import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface Props {
    featured_characters: Array<{
        id: number;
        name: string;
        description: string;
        image_url?: string;
    }>;
    trivia_count: number;
    top_scores: Array<{
        id: number;
        player_name: string;
        score: number;
        accuracy: number;
    }>;
    [key: string]: unknown;
}

export default function Welcome({ featured_characters, trivia_count, top_scores }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="🍄 Super Mario Universe">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 p-6 text-white lg:justify-center lg:p-8">
                <header className="mb-6 w-full max-w-[335px] text-sm lg:max-w-6xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-lg bg-yellow-500 px-6 py-2 font-bold text-red-800 shadow-lg transition-transform hover:scale-105 hover:bg-yellow-400"
                            >
                                🏰 Admin Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg border-2 border-white px-5 py-2 font-semibold text-white transition-all hover:bg-white hover:text-blue-600"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-green-500 px-5 py-2 font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-green-400"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                
                <div className="w-full max-w-6xl">
                    {/* Hero Section */}
                    <div className="mb-12 text-center">
                        <h1 className="mb-6 text-6xl font-bold text-yellow-300 drop-shadow-lg lg:text-8xl">
                            🍄 Super Mario Universe
                        </h1>
                        <p className="mb-8 text-xl lg:text-2xl">
                            Explore characters, test your knowledge, and compete for high scores!
                        </p>
                        
                        {/* Main Features */}
                        <div className="mb-12 grid gap-6 md:grid-cols-3">
                            <Link 
                                href={route('characters.index')}
                                className="group rounded-2xl bg-white p-8 text-center shadow-2xl transition-all hover:scale-105"
                            >
                                <div className="mb-4 text-6xl">👥</div>
                                <h3 className="mb-2 text-2xl font-bold text-red-600">Characters</h3>
                                <p className="text-gray-600">Meet all your favorite Super Mario characters</p>
                                <div className="mt-4 text-sm font-semibold text-blue-600">
                                    {featured_characters.length} characters available
                                </div>
                            </Link>
                            
                            <Link 
                                href={route('trivia.index')}
                                className="group rounded-2xl bg-white p-8 text-center shadow-2xl transition-all hover:scale-105"
                            >
                                <div className="mb-4 text-6xl">🧠</div>
                                <h3 className="mb-2 text-2xl font-bold text-green-600">Trivia Game</h3>
                                <p className="text-gray-600">Test your Super Mario knowledge</p>
                                <div className="mt-4 text-sm font-semibold text-blue-600">
                                    {trivia_count} questions available
                                </div>
                            </Link>
                            
                            <Link 
                                href={route('high-scores.index')}
                                className="group rounded-2xl bg-white p-8 text-center shadow-2xl transition-all hover:scale-105"
                            >
                                <div className="mb-4 text-6xl">🏆</div>
                                <h3 className="mb-2 text-2xl font-bold text-yellow-600">High Scores</h3>
                                <p className="text-gray-600">See the top trivia champions</p>
                                <div className="mt-4 text-sm font-semibold text-blue-600">
                                    Top score: {top_scores[0]?.score || 0} points
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Featured Characters Preview */}
                    {featured_characters.length > 0 && (
                        <div className="mb-12 rounded-2xl bg-white bg-opacity-20 p-8 backdrop-blur-sm">
                            <h2 className="mb-6 text-center text-3xl font-bold text-yellow-300">
                                🌟 Featured Characters
                            </h2>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {featured_characters.slice(0, 6).map((character) => (
                                    <div key={character.id} className="rounded-xl bg-white p-6 text-center shadow-lg">
                                        <div className="mb-3 text-4xl">
                                            {character.name === 'Mario' && '🔴'}
                                            {character.name === 'Luigi' && '🟢'}
                                            {character.name === 'Princess Peach' && '👑'}
                                            {character.name === 'Bowser' && '🐢'}
                                            {character.name === 'Yoshi' && '🦕'}
                                            {character.name === 'Toad' && '🍄'}
                                            {!['Mario', 'Luigi', 'Princess Peach', 'Bowser', 'Yoshi', 'Toad'].includes(character.name) && '⭐'}
                                        </div>
                                        <h3 className="mb-2 text-lg font-bold text-red-600">{character.name}</h3>
                                        <p className="text-sm text-gray-600 line-clamp-3">{character.description}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 text-center">
                                <Link 
                                    href={route('characters.index')}
                                    className="inline-block rounded-lg bg-red-600 px-8 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-red-500"
                                >
                                    View All Characters →
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Quick Start */}
                    <div className="text-center">
                        <h2 className="mb-4 text-3xl font-bold text-yellow-300">
                            Ready to Play? 🎮
                        </h2>
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <Link 
                                href={route('trivia.index')}
                                className="rounded-lg bg-green-600 px-8 py-4 text-xl font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-green-500"
                            >
                                🚀 Start Trivia Game
                            </Link>
                            <Link 
                                href={route('characters.index')}
                                className="rounded-lg bg-red-600 px-8 py-4 text-xl font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-red-500"
                            >
                                🔍 Explore Characters
                            </Link>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="mt-16 text-center text-white">
                        <p className="mb-2 text-lg">
                            Built with ❤️ for Super Mario fans everywhere!
                        </p>
                        <p className="text-sm opacity-75">
                            Powered by{" "}
                            <a 
                                href="https://app.build" 
                                target="_blank" 
                                className="font-medium text-yellow-300 hover:underline"
                            >
                                app.build
                            </a>
                        </p>
                    </footer>
                </div>
            </div>
        </>
    );
}