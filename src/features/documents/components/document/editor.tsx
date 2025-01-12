"use client";

import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageResize from "tiptap-extension-resize-image";
import { useStorage } from "@liveblocks/react";

import Ruler from "@/features/documents/components/document/ruler";
import {
  FontSizeExtension,
  LineHeightExtension,
} from "@/features/documents/core/extensions";
import { useEditorStore } from "@/features/documents/core/hooks";

import Threads from "@/components/threads";

const Editor = () => {
  const liveblocks = useLiveblocksExtension();
  const leftMargin = useStorage((root) => root.leftMargin) ?? 56;
  const rightMargin = useStorage((root) => root.rightMargin) ?? 56;
  const { setEditor } = useEditorStore();
  const editor = useEditor({
    autofocus: true,
    immediatelyRender: false,
    onCreate: ({ editor }) => setEditor(editor),
    onUpdate: ({ editor }) => setEditor(editor),
    onSelectionUpdate: ({ editor }) => setEditor(editor),
    onTransaction: ({ editor }) => setEditor(editor),
    onFocus: ({ editor }) => setEditor(editor),
    onBlur: ({ editor }) => setEditor(editor),
    onContentError: ({ editor }) => setEditor(editor),
    onDestroy: () => setEditor(null),
    editorProps: {
      attributes: {
        class:
          "w-[816px] min-h-[1024px] flex flex-col pt-10 pb-10 pr-14 cursor-text bg-white border border-[#C7C7C7] focus:outline-none print:border-0",
        style: `padding-left: ${leftMargin}px; padding-right:${rightMargin}px`,
      },
    },
    extensions: [
      liveblocks,
      StarterKit.configure({
        history: false,
      }),
      FontSizeExtension,
      LineHeightExtension.configure({
        types: ["heading", "paragraph"],
        defaultLineHeight: "normal",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
      }),
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      TextStyle,
      FontFamily,
      Underline,
      Image,
      ImageResize,
      Table,
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
  });

  return (
    <div className="size-full overflow-x-auto px-4 bg-[#F9FBFD] print:p-0 print:bg-white print:overflow-visible">
      <Ruler />
      <div className="w-[816px] min-w-max flex justify-center mx-auto py-4 print:py-0 after:print:w-full print:min-w-0">
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
