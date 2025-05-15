import { create } from 'zustand';

type NoteStore = {
    noteId: string | null;
    title: string | null;
    setNoteId: (id: string) => void;
    setNoteTitle: (title: string) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
    noteId: null,
    title: null,
    setNoteId: (id: string) => set({noteId: id}),
    setNoteTitle: (title: string) => set({title: title})
}))