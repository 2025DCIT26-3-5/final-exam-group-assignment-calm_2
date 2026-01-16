import express from "express";
import type { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

type Note = {
  id: number;
  course: string;
  title: string;
  content: string;
  ratings: number[];
};

let notes: Note[] = [
  {
    id: 1,
    course: "ITEC80",
    title: "Introduction to Human Computer Interaction",
    content: "HCI",
    ratings: [5, 4, 4],
  },
  {
    id: 2,
    course: "DCIT26",
    title: "Application Development and Emerging Technologies",
    content: "MERN",
    ratings: [5, 5, 5],
  },
  {
    id: 3,
    course: "MOR",
    title: "Methods of Research",
    content: "Qualitative and Quantitative Research",
    ratings: [5, 5, 4],
  },
];

const calcAvg = (arr: number[]): number =>
  arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

app.get("/notes/:course", (req: Request, res: Response) => {
  const course = String(req.params.course).toLowerCase();
  const courseNotes = notes
    .filter((n) => n.course.toLowerCase() === course)
    .map((n) => ({ ...n, avgRating: calcAvg(n.ratings) }));
  res.json(courseNotes);
});

app.post("/notes", (req: Request, res: Response) => {
  const { course, title, content } = req.body;
  if (!course || !title || !content) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const newNote: Note = {
    id: notes.length + 1,
    course,
    title,
    content,
    ratings: [],
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

app.post("/ratings/:id", (req: Request, res: Response) => {
  const noteId = parseInt(String(req.params.id), 10);
  const { rating } = req.body;
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Invalid rating" });
  }

  const note = notes.find((n) => n.id === noteId);
  if (!note) return res.status(404).json({ error: "Note not found" });

  note.ratings.push(rating);
  res.json({ ...note, avgRating: calcAvg(note.ratings) });
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
