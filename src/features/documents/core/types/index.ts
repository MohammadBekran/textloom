import { Document } from "@prisma/client";

export type TDocument = Omit<Document, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};
