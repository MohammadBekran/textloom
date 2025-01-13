"use client";

import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BsFilePdf } from "react-icons/bs";

import Avatars from "@/features/documents/components/document/avatars";
import CreateDocumentDialog from "@/features/documents/components/document/create-document-dialog";
import DeleteDocumentDialog from "@/features/documents/components/document/delete-document-dialog";
import DocumentInput from "@/features/documents/components/document/document-input";
import InboxNotifications from "@/features/documents/components/document/inbox-notifications";
import RenameDocumentDialog from "@/features/documents/components/document/rename-document-dialog";
import { useEditorStore } from "@/features/documents/core/hooks";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import UserButtons from "@/components/user-buttons";

interface INavbarProps {
  documentId: string;
  documentTitle: string;
}

const Navbar = ({ documentId, documentTitle }: INavbarProps) => {
  const { editor } = useEditorStore();

  const handleUndo = () => editor?.chain().focus().undo().run();

  const handleRedo = () => editor?.chain().focus().redo().run();

  const handleBold = () => editor?.chain().focus().toggleBold().run();

  const handleItalic = () => editor?.chain().focus().toggleItalic().run();

  const handleUnderline = () => editor?.chain().focus().toggleUnderline().run();

  const handleStrikethrough = () => {
    editor?.chain().focus().toggleStrike().run();
  };

  const handleClearFormatting = () => {
    editor?.chain().focus().unsetAllMarks().run();
  };

  const handleInsertTable = ({
    rows,
    cols,
  }: {
    rows: number;
    cols: number;
  }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  const handleDownload = ({
    blob,
    fileName,
  }: {
    blob: Blob;
    fileName: string;
  }) => {
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
  };

  const handleSaveJSON = () => {
    if (!editor) return;

    const context = editor.getJSON();
    const blob = new Blob([JSON.stringify(context)], {
      type: "application/json",
    });

    handleDownload({ blob, fileName: `${documentTitle}.json` });
  };

  const handleSaveHTML = () => {
    if (!editor) return;

    const context = editor.getHTML();
    const blob = new Blob([context], {
      type: "text/html",
    });

    handleDownload({ blob, fileName: `${documentTitle}.html` });
  };

  const handleSaveText = () => {
    if (!editor) return;

    const context = editor.getText();
    const blob = new Blob([context], {
      type: "text/plain",
    });

    handleDownload({ blob, fileName: `${documentTitle}.txt` });
  };

  const handlePrint = () => window.print();

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        </Link>
        <div className="flex flex-col">
          <DocumentInput
            documentId={documentId}
            documentTitle={documentTitle}
          />
          <Menubar className="h-auto border-none shadow-none p-0 bg-transparent">
            <MenubarMenu>
              <MenubarTrigger className="menubar-trigger">File</MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger>
                    <FileIcon className="size-4 mr-2" />
                    Save
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem onClick={handleSaveJSON}>
                      <FileJsonIcon className="size-4 mr-2" />
                      JSON
                    </MenubarItem>
                    <MenubarItem onClick={handleSaveHTML}>
                      <GlobeIcon className="size-4 mr-2" />
                      HTML
                    </MenubarItem>
                    <MenubarItem onClick={handlePrint}>
                      <BsFilePdf className="size-4 mr-2" />
                      PDF
                    </MenubarItem>
                    <MenubarItem onClick={handleSaveText}>
                      <FileTextIcon className="size-4 mr-2" />
                      Text
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <CreateDocumentDialog>
                  <MenubarItem
                    onClick={(e) => e.stopPropagation()}
                    onSelect={(e) => e.preventDefault()}
                  >
                    <FilePlusIcon className="size-4 mr-2" />
                    New Document
                  </MenubarItem>
                </CreateDocumentDialog>
                <MenubarSeparator />
                <RenameDocumentDialog
                  documentId={documentId}
                  title={documentTitle}
                >
                  <MenubarItem
                    onClick={(e) => e.stopPropagation()}
                    onSelect={(e) => e.preventDefault()}
                  >
                    <FilePenIcon className="size-4 mr-2" />
                    Rename
                  </MenubarItem>
                </RenameDocumentDialog>
                <DeleteDocumentDialog documentId={documentId}>
                  <MenubarItem
                    onClick={(e) => e.stopPropagation()}
                    onSelect={(e) => e.preventDefault()}
                  >
                    <TrashIcon className="size-4 mr-2" />
                    Trash
                  </MenubarItem>
                </DeleteDocumentDialog>
                <MenubarSeparator />
                <MenubarItem onClick={handlePrint}>
                  <PrinterIcon className="size-4 mr-2" />
                  Print <MenubarShortcut>⌘P</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="menubar-trigger">Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={handleUndo}>
                  Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onClick={handleRedo}>
                  Redo <MenubarShortcut>⌘Y</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="menubar-trigger">
                Insert
              </MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger>Table</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem
                      onClick={() => handleInsertTable({ rows: 1, cols: 1 })}
                    >
                      1 x 1
                    </MenubarItem>
                    <MenubarItem
                      onClick={() => handleInsertTable({ rows: 2, cols: 2 })}
                    >
                      2 x 2
                    </MenubarItem>
                    <MenubarItem
                      onClick={() => handleInsertTable({ rows: 3, cols: 3 })}
                    >
                      3 x 3
                    </MenubarItem>
                    <MenubarItem
                      onClick={() => handleInsertTable({ rows: 4, cols: 4 })}
                    >
                      4 x 4
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="menubar-trigger">
                Format
              </MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger>
                    <TextIcon className="size-4 mr-2" />
                    Text
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem onClick={handleBold}>
                      <BoldIcon className="size-4 mr-2" />
                      Bold <MenubarShortcut>⌘B</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={handleItalic}>
                      <ItalicIcon className="size-4 mr-2" />
                      Italic <MenubarShortcut>⌘I</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={handleUnderline}>
                      <UnderlineIcon className="size-4 mr-2" />
                      Underline <MenubarShortcut>⌘U</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={handleStrikethrough}>
                      <StrikethroughIcon className="size-4 mr-2" />
                      Strikethrough&nbsp;&nbsp;
                      <MenubarShortcut>⌘S</MenubarShortcut>
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarItem onClick={handleClearFormatting}>
                  <RemoveFormattingIcon className="size-4 mr-2" />
                  Clear Formatting
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
      <div className="hidden items-center gap-3 pl-6 lg:flex">
        <InboxNotifications />
        <Avatars />
        <UserButtons />
      </div>
    </div>
  );
};

export default Navbar;
