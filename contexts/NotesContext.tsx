import React, { createContext, useContext, useState, ReactNode } from "react";

type Note = { id: number; title: string; content: string; rating: number };

type NotesContextType = {
  notes: Note[];
  addNote: (note: Omit<Note, "id">) => void;
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

  const addNote = (note: Omit<Note, "id">) => {
    const newNote = { ...note, id: Date.now() };
    setNotes((prev) => [...prev, newNote]);
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNotes: setNotes }}>
      {children}
    </NotesContext.Provider>
  );
};
