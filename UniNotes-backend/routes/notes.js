import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

// Helper to calculate average rating
const calcAvg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

// Get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().populate("user", "name email");
    const notesWithAvg = notes.map(n => ({ ...n._doc, avgRating: calcAvg(n.ratings) }));
    res.json(notesWithAvg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new note
router.post("/", async (req, res) => {
  const { user, course, title, content } = req.body;
  if (!user || !title || !content) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const newNote = new Note({ user, course, title, content, ratings: [] });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add rating
router.post("/:id/ratings", async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Invalid rating" });
  }

  try {
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    note.ratings.push(rating);
    await note.save();
    res.json({ ...note._doc, avgRating: calcAvg(note.ratings) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
