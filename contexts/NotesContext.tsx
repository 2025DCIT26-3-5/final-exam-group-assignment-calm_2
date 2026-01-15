import React, { createContext, useContext, useState, ReactNode } from "react";

// Note type
export type Note = {
  id: number;
  title: string;
  content: string;
  rating: number;
  ratings: number[];
  isFavorite?: boolean; // ⭐ ADD
};

type NotesContextType = {
  notes: Note[];
  addNote: (note: Omit<Note, "id" | "ratings" | "isFavorite">) => void;
  addRating: (id: number, rating: number) => void;
  updateNote: (note: Note) => void;       // ✏️ ADD
  deleteNote: (id: number) => void;       // 🗑️ ADD
  toggleFavorite: (id: number) => void;   // ⭐ ADD
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within NotesProvider");
  }
  return context;
};

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  // ➕ Add a new note
  const addNote = (note: Omit<Note, "id" | "ratings" | "isFavorite">) => {
    const newNote: Note = {
      ...note,
      id: Date.now(),
      ratings: [],
      isFavorite: false,
    };
    setNotes(prev => [...prev, newNote]);
  };

  // ⭐ Toggle favorite
  const toggleFavorite = (id: number) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id
          ? { ...note, isFavorite: !note.isFavorite }
          : note
      )
    );
  };

  // ⭐ Add rating
  const addRating = (id: number, rating: number) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id
          ? { ...note, ratings: [...note.ratings, rating] }
          : note
      )
    );
  };

  // ✏️ Update note
  const updateNote = (updatedNote: Note) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === updatedNote.id ? updatedNote : note
      )
    );
  };

  // 🗑️ Delete note
  const deleteNote = (id: number) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        addRating,
        updateNote,
        deleteNote,
        toggleFavorite,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
