import express from "express"; // default import only
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

interface Note {
  id: number;
  title: string;
  content: string;
  rating: number;
}

let notes: Note[] = [];

app.get("/notes", (req, res) => {
  const sortedNotes = [...notes].sort((a, b) => b.rating - a.rating);
  res.json(sortedNotes);
});

app.post("/notes", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ message: "Title and content required" });

  const newNote: Note = { id: Date.now(), title, content, rating: 0 };
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.post("/notes/:id/rate", (req, res) => {
  const noteId = parseInt(req.params.id);
  const { delta } = req.body;
  const note = notes.find((n) => n.id === noteId);
  if (!note) return res.status(404).json({ message: "Note not found" });

  if (typeof delta !== "number")
    return res.status(400).json({ message: "Delta must be a number" });

  note.rating += delta;
  res.json(note);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
