"use server";

import { prisma } from "@/lib/prisma";

export const getDocumentsByIds = async (documentIds: string[]) => {
  const documents = await prisma.document.findMany({
    where: {
      id: {
        in: documentIds,
      },
    },
  });

  return documents;
};

export const getDocument = async (documentId: string) => {
  try {
    const document = await prisma.document.findUnique({
      where: {
        id: documentId,
      },
    });

    if (!document) throw new Error("Document not found");

    return document;
  } catch (error) {
    console.error(error);

    throw new Error("Something went wrong");
  }
};
