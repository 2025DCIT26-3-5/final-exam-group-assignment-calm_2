import axios from "axios";
import { Note } from "../types";

const API_URL =
  "https://didactic-doodle-xxxxx-3000.app.github.dev/api";

export const fetchNotes = async () => {
  const res = await axios.get<Note[]>(`${API_URL}/notes`);
  return res.data;
};

export const createNote = async (note: Note) => {
  const res = await axios.post(`${API_URL}/notes`, note);
  return res.data;
};

export const rateNote = async (id: string, rating: number) => {
  await axios.post(`${API_URL}/notes/${id}/rate`, { rating });
};
