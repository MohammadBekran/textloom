"use server";

import { prisma } from "@/lib/prisma";

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
