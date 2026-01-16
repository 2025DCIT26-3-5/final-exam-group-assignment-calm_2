const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const User = require('../models/user');

// Create a new note
router.post('/', async (req, res) => {
    const { userId, title, content } = req.body;

    try {
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const newNote = new Note({ user: userId, title, content });
        await newNote.save();

        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all notes for a user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a note
router.put('/:noteId', async (req, res) => {
    const { noteId } = req.params;
    const { title, content } = req.body;

    try {
        const note = await Note.findById(noteId);
        if (!note) return res.status(404).json({ error: 'Note not found' });

        note.title = title || note.title;
        note.content = content || note.content;
        await note.save();

        res.json(note);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a note
router.delete('/:noteId', async (req, res) => {
    const { noteId } = req.params;

    try {
        const note = await Note.findByIdAndDelete(noteId);
        if (!note) return res.status(404).json({ error: 'Note not found' });

        res.json({ message: 'Note deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
