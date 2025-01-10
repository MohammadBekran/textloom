"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BoldIcon,
  ChevronDownIcon,
  ItalicIcon,
  ListTodoIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
  type LucideIcon,
} from "lucide-react";
import type { Level } from "@tiptap/extension-heading";

import { useEditorStore } from "@/features/documents/core/hooks";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface IToolbarButtonProps {
  icon: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
}

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const HEADINGS = [
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
  ];

  const getCurrentHeading = () => {
    for (const level of HEADINGS) {
      console.log(level);

      if (editor?.isActive("heading", { level: level.value }))
        return `Heading ${level.value}`;
    }

    return "Normal text";
  };

  const handleHeadingChange = (value: number) => {
    if (value === 0) {
      editor?.chain().focus().setParagraph().run();
    } else {
      editor
        ?.chain()
        .focus()
        .toggleHeading({ level: value as Level })
        .run();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="min-w-7 h-7 overflow-hidden flex justify-center items-center shrink-0 rounded-sm text-sm px-1.5 hover:bg-neutral-200/80">
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="size-4 shrink-0 ml-2" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
        {HEADINGS.map(({ label, value, fontSize }) => (
          <button
            key={value}
            style={{ fontSize }}
            className={cn(
              "flex items-center gap-x-2 rounded-sm py-1 px-2 hover:bg-neutral-200/80",
              {
                "bg-neutral-200/80":
                  (value === 0 && !editor?.isActive("heading")) ||
                  editor?.isActive("heading", { level: value }),
              }
            )}
            onClick={() => handleHeadingChange(value)}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fontFamily = editor?.getAttributes("textStyle").fontFamily || "Arial";

  const FONTS = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Verdana", value: "Verdana" },
  ];

  const handleFontChange = (value: string) => {
    editor?.chain().focus().setFontFamily(value).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-[120px] h-7 overflow-hidden flex justify-between items-center shrink-0 rounded-sm text-sm px-1.5 hover:bg-neutral-200/80">
          <span className="truncate">{fontFamily}</span>
          <ChevronDownIcon className="size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
        {FONTS.map(({ label, value }) => (
          <button
            key={value}
            style={{ fontFamily: value }}
            className={cn(
              "flex items-center gap-x-2 rounded-sm py-1 px-2 hover:bg-neutral-200/80",
              {
                "bg-neutral-200/80": fontFamily === value,
              }
            )}
            onClick={() => handleFontChange(value)}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ToolbarButton = ({
  icon: Icon,
  isActive,
  onClick,
}: IToolbarButtonProps) => {
  return (
    <button
      className={cn(
        "min-w-7 h-7 flex justify-center items-center rounded-sm text-sm hover:bg-neutral-200/80",
        {
          "bg-neutral-200/80": isActive,
        }
      )}
      onClick={onClick}
    >
      <Icon className="size-4" />
    </button>
  );
};

const Toolbar = () => {
  const { editor } = useEditorStore();

  const TOOLBAR_SECTIONS: {
    label: string;
    icon: LucideIcon;
    isActive?: boolean;
    onClick: () => void;
  }[][] = [
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
        onClick: () => console.log("Comments"),
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
  ];

  return (
    <div className="min-h-[40px] overflow-auto flex items-center gap-x-0.5 rounded-[24px] py-0.5 px-2.5 bg-[#F1F4F9]">
      {TOOLBAR_SECTIONS[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {TOOLBAR_SECTIONS[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {TOOLBAR_SECTIONS[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};

export default Toolbar;
