import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

// Note type based on backend MongoDB
export type Note = {
  _id: string;        // MongoDB ID from backend
  title: string;
  content: string;
  rating: number;
  ratings: number[];
  authorId: string;
};

// Context type
type NotesContextType = {
  notes: Note[];
  fetchNotes: () => void;
  addNote: (note: { title: string; content: string }) => Promise<void>;
  addRating: (id: string, rating: number) => Promise<void>;
  updateNotes: (notes: Note[]) => void;
};

// Create context
const NotesContext = createContext<NotesContextType | undefined>(undefined);

// Hook to use NotesContext
export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used within NotesProvider");
  return context;
};

// Provider component
export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const { userId } = useAuth();

  // Fetch notes from backend for current user
  const fetchNotes = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`http://localhost:3000/notes?authorId=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch notes");
      const data: Note[] = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Fetch notes error:", err);
    }
  };

  // Fetch notes on userId change
  useEffect(() => {
    fetchNotes();
  }, [userId]);

  // Add a new note
  const addNote = async (note: { title: string; content: string }) => {
    if (!userId) return;
    try {
      const res = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...note, authorId: userId }),
      });
      if (!res.ok) throw new Error("Failed to save note");
      const savedNote: Note = await res.json();
      setNotes((prev) => [...prev, savedNote]);
    } catch (err) {
      console.error("Add note error:", err);
    }
  };

  // Add rating to a note
  const addRating = async (id: string, rating: number) => {
    try {
      const res = await fetch(`http://localhost:3000/ratings/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating }),
      });
      if (!res.ok) throw new Error("Failed to add rating");
      const updatedNote: Note = await res.json();
      setNotes((prev) =>
        prev.map((n) => (n._id === updatedNote._id ? updatedNote : n))
      );
    } catch (err) {
      console.error("Add rating error:", err);
    }
  };

  // Update notes manually
  const updateNotes = (updatedNotes: Note[]) => {
    setNotes(updatedNotes);
  };

  return (
    <NotesContext.Provider
      value={{ notes, fetchNotes, addNote, addRating, updateNotes }}
    >
      {children}
    </NotesContext.Provider>
  );
};
