import { create } from 'zustand';
import { Editor } from '@tiptap/react';

interface EditorStore {
  currentEditor: Editor | null;
  setCurrentEditor: (editor: Editor) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  currentEditor: null,
  setCurrentEditor: (editor) => set({ currentEditor: editor }),
}));