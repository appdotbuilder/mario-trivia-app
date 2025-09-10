<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCharacterRequest;
use App\Http\Requests\UpdateCharacterRequest;
use App\Models\Character;
use Inertia\Inertia;

class CharacterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $characters = Character::latest()->paginate(12);
        
        return Inertia::render('characters/index', [
            'characters' => $characters
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('characters/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCharacterRequest $request)
    {
        $character = Character::create($request->validated());

        return redirect()->route('characters.index')
            ->with('success', 'Character created successfully! 🎮');
    }

    /**
     * Display the specified resource.
     */
    public function show(Character $character)
    {
        return Inertia::render('characters/show', [
            'character' => $character
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Character $character)
    {
        return Inertia::render('characters/edit', [
            'character' => $character
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCharacterRequest $request, Character $character)
    {
        $character->update($request->validated());

        return redirect()->route('characters.show', $character)
            ->with('success', 'Character updated successfully! ✨');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Character $character)
    {
        $character->delete();

        return redirect()->route('characters.index')
            ->with('success', 'Character deleted successfully! 🗑️');
    }
}