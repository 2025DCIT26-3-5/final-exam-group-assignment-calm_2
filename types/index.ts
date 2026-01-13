export type Note = {
  id: number;
  title: string;
  content: string;
  course: string;
  avgRating?: number | null;
  ratings?: number[] | null;
};

export type RootStackParamList = {
  NotesScreen: { course: string };
  NoteDetail: { note: Note };
  AddNote: { course: string };
};
