import { create } from "zustand";
import type { Editor } from "@tiptap/react";

interface IEditorStore {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
}

export const useEditorStore = create<IEditorStore>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
}));
