import React, { createContext, useContext, useState, ReactNode } from "react";

// Keep ratings as an array
export type Note = {
  id: number;
  title: string;
  content: string;
  rating: number;
  ratings: number[];
};

type NotesContextType = {
  notes: Note[];
  addNote: (note: Omit<Note, "id" | "ratings">) => void;
  addRating: (id: number, rating: number) => void;
  updateNotes: (notes: Note[]) => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used within NotesProvider");
  return context;
};

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  // Add a new note
  const addNote = (note: Omit<Note, "id" | "ratings">) => {
    const newNote: Note = { ...note, id: Date.now(), ratings: [] };
    setNotes((prev) => [...prev, newNote]);
  };

  // Add rating to a note
  const addRating = (id: number, rating: number) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, ratings: [...note.ratings, rating] } : note
      )
    );
  };

  // Update notes array (bulk update)
  const updateNotes = (updatedNotes: Note[]) => {
    setNotes(updatedNotes);
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, addRating, updateNotes }}>
      {children}
    </NotesContext.Provider>
  );
};
