import { create } from "zustand";

type NoteStore = {
  selectedNotes: Record<string, string>;
  noteTitles: Record<string, string>;
  loadingSelectedNotes: Record<string, boolean>;

  setSelectedNote: (userId: string, noteId: string) => void;
  getSelectedNote: (userId: string) => string | undefined;

  setNoteTitle: (userId: string, title: string) => void;
  getNoteTitle: (userId: string) => string | undefined;

  setLoadingSelectedNote: (userId: string, isLoading: boolean) => void;
  isLoadingSelectedNote: (userId: string) => boolean;
};

export const useNoteStore = create<NoteStore>((set, get) => ({
  selectedNotes: {},
  noteTitles: {},
  loadingSelectedNotes: {},

  setSelectedNote: (userId, noteId) =>
    set((state) => ({
      selectedNotes: {
        ...state.selectedNotes,
        [userId]: noteId,
      },
      loadingSelectedNotes: {
        ...state.loadingSelectedNotes,
        [userId]: false,
      },
    })),

  getSelectedNote: (userId) => get().selectedNotes[userId],

  setNoteTitle: (userId, title) =>
    set((state) => ({
      noteTitles: {
        ...state.noteTitles,
        [userId]: title,
      },
    })),

  getNoteTitle: (userId) => get().noteTitles[userId],

  setLoadingSelectedNote: (userId, isLoading) =>
    set((state) => ({
      loadingSelectedNotes: {
        ...state.loadingSelectedNotes,
        [userId]: isLoading,
      },
    })),

  isLoadingSelectedNote: (userId) => get().loadingSelectedNotes[userId] ?? false,
}));