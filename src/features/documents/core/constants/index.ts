import type { Editor } from "@tiptap/react";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";

export const EDITOR_PAGE_SIZE = 816 as const;
export const RULER_MAXIMUM_SPACE = 100 as const;

export const LEFT_MARGIN = 56 as const;
export const RIGHT_MARGIN = 56 as const;

export const ALIGNMENT_OPTIONS = [
  {
    label: "Align Left",
    value: "left",
    icon: AlignLeftIcon,
  },
  {
    label: "Align Center",
    value: "center",
    icon: AlignCenterIcon,
  },
  {
    label: "Align Right",
    value: "right",
    icon: AlignRightIcon,
  },
  {
    label: "Align Justify",
    value: "justify",
    icon: AlignJustifyIcon,
  },
] as const;

export const HEADINGS = [
  {
    label: "Normal text",
    value: 0,
    fontSize: "16px",
  },
  {
    label: "Heading 1",
    value: 1,
    fontSize: "32px",
  },
  {
    label: "Heading 2",
    value: 2,
    fontSize: "24px",
  },
  {
    label: "Heading 3",
    value: 3,
    fontSize: "20px",
  },
  {
    label: "Heading 4",
    value: 4,
    fontSize: "18px",
  },
  {
    label: "Heading 5",
    value: 5,
    fontSize: "16px",
  },
] as const;

export const LINE_HEIGHT_OPTIONS = [
  { label: "Default", value: "normal" },
  { label: "Single", value: "1" },
  { label: "1.15", value: "1.15" },
  { label: "1.5", value: "1.5" },
  { label: "Double", value: "2" },
] as const;

export const TOOLBAR_SECTIONS = (editor: Editor | null) =>
  [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");

          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "Comments",
        icon: MessageSquarePlusIcon,
        isActive: editor?.isActive("liveblocksCommentMark"),
        onClick: () => editor?.chain().focus().addPendingComment().run(),
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        isActive: editor?.isActive("taskList"),
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ] as const;

export const LIST_OPTIONS = (editor: Editor | null) =>
  [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered List",
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ] as const;
