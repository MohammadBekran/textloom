"use client";

import type { Level } from "@tiptap/extension-heading";
import {
  AlignLeftIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ImageIcon,
  Link2Icon,
  ListCollapseIcon,
  ListIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
  UploadIcon,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { SketchPicker, type ColorResult } from "react-color";

import {
  ALIGNMENT_OPTIONS,
  HEADINGS,
  LINE_HEIGHT_OPTIONS,
  LIST_OPTIONS,
  TOOLBAR_SECTIONS,
} from "@/features/documents/core/constants";
import { useEditorStore } from "@/features/documents/core/hooks";

import Tooltip from "@/components/tooltip";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const LineHeightButton = () => {
  const { editor } = useEditorStore();

  const lineHeight = editor?.getAttributes("paragraph").lineHeight;

  const handleLineHeightClick = (lineHeight: string) => {
    editor?.chain().focus().setLineHeight(lineHeight).run();
  };

  return (
    <DropdownMenu>
      <Tooltip
        trigger={
          <DropdownMenuTrigger asChild>
            <button className="min-w-7 h-7 overflow-hidden flex justify-center items-center shrink-0 rounded-sm text-sm px-1.5 hover:bg-neutral-200/80">
              <ListCollapseIcon className="size-4" />
            </button>
          </DropdownMenuTrigger>
        }
      >
        Line Height
      </Tooltip>
      <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
        {LINE_HEIGHT_OPTIONS.map(({ label, value }) => (
          <button
            key={value}
            className={cn(
              "flex items-center gap-x-2 rounded-sm py-1 px-2 hover:bg-neutral-200/80",
              {
                "bg-neutral-200/80": lineHeight === value,
              }
            )}
            onClick={() => handleLineHeightClick(value)}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const editorFontSize = editor?.getAttributes("textStyle").fontSize;
  const currentFontSize = editorFontSize
    ? editorFontSize.replace("px", "")
    : 16;

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();

      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => updateFontSize(inputValue);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const handleFontSizeChange = () => {
    setIsEditing(true);
    setFontSize(currentFontSize);
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;

    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;

    if (newSize > 0) updateFontSize(newSize.toString());
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <Tooltip
        trigger={
          <button className="font-size-button" onClick={decrement}>
            <MinusIcon className="size-4" />
          </button>
        }
      >
        Decrement Font Size
      </Tooltip>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          className="w-10 h-7 rounded-sm text-sm text-center border border-neutral-400 bg-transparent hover:bg-neutral-200/80 focus:outline-none focus:ring-0"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
        />
      ) : (
        <button
          className="w-10 h-7 rounded-sm text-sm text-center border border-neutral-400 hover:bg-neutral-200/80"
          onClick={handleFontSizeChange}
        >
          {currentFontSize}
        </button>
      )}
      <Tooltip
        trigger={
          <button className="font-size-button" onClick={increment}>
            <PlusIcon className="size-4" />
          </button>
        }
      >
        Increment Font Size
      </Tooltip>
    </div>
  );
};

const ListButton = () => {
  const { editor } = useEditorStore();

  const listOptions = LIST_OPTIONS(editor);

  return (
    <DropdownMenu>
      <Tooltip
        trigger={
          <DropdownMenuTrigger asChild>
            <button className="min-w-7 h-7 overflow-hidden flex justify-center items-center shrink-0 rounded-sm text-sm px-1.5 hover:bg-neutral-200/80">
              <ListIcon className="size-4" />
            </button>
          </DropdownMenuTrigger>
        }
      >
        List
      </Tooltip>
      <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
        {listOptions.map(({ label, icon: Icon, isActive, onClick }) => (
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

  const handleAlignClick = (alignment: string) => {
    editor?.chain().focus().setTextAlign(alignment).run();
  };

  return (
    <DropdownMenu>
      <Tooltip
        trigger={
          <DropdownMenuTrigger asChild>
            <button className="min-w-7 h-7 overflow-hidden flex justify-center items-center shrink-0 rounded-sm text-sm px-1.5 hover:bg-neutral-200/80">
              <AlignLeftIcon className="size-4" />
            </button>
          </DropdownMenuTrigger>
        }
      >
        Alignment
      </Tooltip>
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
        <Tooltip
          trigger={
            <DropdownMenuTrigger asChild>
              <button className="min-w-7 h-7 overflow-hidden flex justify-center items-center shrink-0 rounded-sm text-sm px-1.5 hover:bg-neutral-200/80">
                <ImageIcon className="size-4" />
              </button>
            </DropdownMenuTrigger>
          }
        >
          Image
        </Tooltip>
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
      <Tooltip
        trigger={
          <DropdownMenuTrigger asChild>
            <button className="min-w-7 h-7 overflow-hidden flex justify-center items-center shrink-0 rounded-sm text-sm px-1.5 hover:bg-neutral-200/80">
              <Link2Icon className="size-4" />
            </button>
          </DropdownMenuTrigger>
        }
      >
        Link
      </Tooltip>
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
      <Tooltip
        trigger={
          <DropdownMenuTrigger asChild>
            <button className="min-w-7 h-7 overflow-hidden flex justify-center items-center shrink-0 rounded-sm text-sm px-1.5 hover:bg-neutral-200/80">
              <HighlighterIcon className="size-4" />
            </button>
          </DropdownMenuTrigger>
        }
      >
        Highlight
      </Tooltip>
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
      <Tooltip
        trigger={
          <DropdownMenuTrigger asChild>
            <button className="min-w-7 h-7 flex flex-col justify-center items-center overflow-hidden shrink-0 rounded-sm text-sm px-1.5 hover:bg-neutral-200/80">
              <span className="text-xs">A</span>
              <div
                className="w-full h-0.5"
                style={{ backgroundColor: value }}
              />
            </button>
          </DropdownMenuTrigger>
        }
      >
        Text Color
      </Tooltip>
      <DropdownMenuContent className="p-0">
        <SketchPicker color={value} onChange={handleColorChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

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
      <Tooltip
        trigger={
          <DropdownMenuTrigger asChild>
            <button className="min-w-7 h-7 overflow-hidden flex justify-center items-center shrink-0 rounded-sm text-sm px-1.5 hover:bg-neutral-200/80">
              <span className="truncate">{getCurrentHeading()}</span>
              <ChevronDownIcon className="size-4 shrink-0 ml-2" />
            </button>
          </DropdownMenuTrigger>
        }
      >
        Heading Level
      </Tooltip>
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
      <Tooltip
        trigger={
          <DropdownMenuTrigger asChild>
            <button className="w-[120px] h-7 overflow-hidden flex justify-between items-center shrink-0 rounded-sm text-sm px-1.5 hover:bg-neutral-200/80">
              <span className="truncate">{fontFamily}</span>
              <ChevronDownIcon className="size-4 shrink-0" />
            </button>
          </DropdownMenuTrigger>
        }
      >
        Font Family
      </Tooltip>
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

interface IToolbarButtonProps {
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
}

const ToolbarButton = ({
  label,
  icon: Icon,
  isActive,
  onClick,
}: IToolbarButtonProps) => {
  return (
    <Tooltip
      trigger={
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
      }
    >
      {label}
    </Tooltip>
  );
};

const Toolbar = () => {
  const { editor } = useEditorStore();

  const toolbarSection = TOOLBAR_SECTIONS(editor);

  return (
    <ScrollArea>
      <div className="min-h-[40px] overflow-auto flex items-center gap-x-0.5 rounded-[24px] py-0.5 px-2.5 bg-[#F1F4F9]">
        {toolbarSection[0].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}
        <Separator orientation="vertical" className="toolbar-separator" />
        <FontFamilyButton />
        <Separator orientation="vertical" className="toolbar-separator" />
        <HeadingLevelButton />
        <Separator orientation="vertical" className="toolbar-separator" />
        <FontSizeButton />
        <Separator orientation="vertical" className="toolbar-separator" />
        {toolbarSection[1].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}
        <TextColorButton />
        <HighlightColorButton />
        <Separator orientation="vertical" className="toolbar-separator" />
        <LinkButton />
        <ImageButton />
        <AlignmentButton />
        <LineHeightButton />
        <ListButton />
        {toolbarSection[2].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default Toolbar;
