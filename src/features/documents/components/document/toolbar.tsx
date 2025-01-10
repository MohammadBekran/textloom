"use client";

import type { Level } from "@tiptap/extension-heading";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  ListIcon,
  ListTodoIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SearchIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { SketchPicker, type ColorResult } from "react-color";

import { useEditorStore } from "@/features/documents/core/hooks";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface IToolbarButtonProps {
  icon: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
}

const ListButton = () => {
  const { editor } = useEditorStore();

  const LIST_OPTIONS = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered List",
      icon: ListIcon,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="min-w-7 h-7 overflow-hidden flex justify-center items-center shrink-0 rounded-sm text-sm px-1.5 hover:bg-neutral-200/80">
          <ListIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
        {LIST_OPTIONS.map(({ label, icon: Icon, isActive, onClick }) => (
          <button
            key={label}
            className={cn(
              "flex items-center gap-x-2 rounded-sm py-1 px-2 hover:bg-neutral-200/80",
              {
                "bg-neutral-200/80": isActive(),
              }
            )}
            onClick={onClick}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AlignmentButton = () => {
  const { editor } = useEditorStore();

  const isAlignmentActive = (alignment: string) => {
    editor?.isActive({ textAlign: alignment });
  };

  const ALIGNMENT_OPTIONS = [
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
  ];

  const handleAlignClick = (alignment: string) => {
    editor?.chain().focus().setTextAlign(alignment).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="min-w-7 h-7 overflow-hidden flex justify-center items-center shrink-0 rounded-sm text-sm px-1.5 hover:bg-neutral-200/80">
          <AlignLeftIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
        {ALIGNMENT_OPTIONS.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            className={cn(
              "flex items-center gap-x-2 rounded-sm py-1 px-2 hover:bg-neutral-200/80",
              {
                "bg-neutral-200/80": isAlignmentActive(value),
              }
            )}
            onClick={() => handleAlignClick(value)}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ImageButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { editor } = useEditorStore();

  const handleImageUrlChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];

      if (file) {
        const imageUrl = URL.createObjectURL(file);

        handleImageUrlChange(imageUrl);
      }
    };

    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      handleImageUrlChange(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleImageUrlSubmit();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="min-w-7 h-7 overflow-hidden flex justify-center items-center shrink-0 rounded-sm text-sm px-1.5 hover:bg-neutral-200/80">
            <ImageIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleImageUpload}
          >
            <UploadIcon className="size-4" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsDialogOpen(true)}
          >
            <SearchIcon className="size-4" />
            Paste image url
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Insert image URL</DialogTitle>
          </DialogHeader>
          <Input
            value={imageUrl}
            placeholder="Insert image URL"
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const LinkButton = () => {
  const [value, setValue] = useState("");
  const { editor } = useEditorStore();

  const handleLinkChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();

    setValue("");
  };

  const handleOpenChange = (open: boolean) => {
    if (open) setValue(editor?.getAttributes("link").href ?? "");
  };

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button className="min-w-7 h-7 overflow-hidden flex justify-center items-center shrink-0 rounded-sm text-sm px-1.5 hover:bg-neutral-200/80">
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex items-center gap-x-2 p-2.5">
        <Input
          value={value}
          placeholder="https://example.com"
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => handleLinkChange(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HighlightColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#FFFFFFFF";

  const handleColorChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="min-w-7 h-7 overflow-hidden flex justify-center items-center shrink-0 rounded-sm text-sm px-1.5 hover:bg-neutral-200/80">
          <HighlighterIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <SketchPicker color={value} onChange={handleColorChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  const handleColorChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="min-w-7 h-7 flex flex-col justify-center items-center overflow-hidden shrink-0 rounded-sm text-sm px-1.5 hover:bg-neutral-200/80">
          <span className="text-xs">A</span>
          <div className="w-full h-0.5" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <SketchPicker color={value} onChange={handleColorChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
      <TextColorButton />
      <HighlightColorButton />
      <LinkButton />
      <ImageButton />
      <AlignmentButton />
      <ListButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {TOOLBAR_SECTIONS[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};

export default Toolbar;
