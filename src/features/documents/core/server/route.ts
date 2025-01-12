import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

const app = new Hono()
  .get(
    "/",
    clerkMiddleware(),
    zValidator(
      "query",
      z.object({
        search: z.string().optional(),
        take: z.string().optional(),
        skip: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { search, take, skip } = c.req.valid("query");

      if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

      const where: Prisma.DocumentWhereInput = {
        ownerId: auth.userId,
        organizationId: auth.orgId ?? undefined,
        ...(search?.trim()
          ? { title: { contains: search.trim(), mode: "insensitive" } }
          : {}),
      };

      const documents = await prisma.document.findMany({
        where,
        take: Number(take) ?? 5,
        skip: Number(skip) ?? 0,
        orderBy: { createdAt: "desc" },
      });

      const totalDocuments = await prisma.document.count({
        where,
      });

      const remaining = Math.max(
        0,
        totalDocuments - (Number(skip ?? 0) + Number(take ?? 5))
      );

      return c.json({ data: documents, remaining });
    }
  )
  .get("/:documentId", clerkMiddleware(), async (c) => {
    try {
      const auth = getAuth(c);
      const { documentId } = c.req.param();

      if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

      const document = await prisma.document.findUnique({
        where: {
          id: documentId,
        },
      });

      if (!document) return c.json({ error: "Document not found" }, 404);

      return c.json({ data: document });
    } catch {
      return c.json({ error: "Something went wrong" }, 400);
    }
  })
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        title: z.string(),
        initialContent: z.string(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { title, initialContent } = c.req.valid("json");

      if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

      const newDocument = await prisma.document.create({
        data: {
          title: title ?? "Untitled Document",
          initialContent,
          ownerId: auth.userId,
          organizationId: auth.orgId,
        },
      });

      return c.json({ data: newDocument });
    }
  )
  .patch(
    "/:documentId",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        title: z.string().optional(),
        content: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { documentId } = c.req.param();
      const { title, content } = c.req.valid("json");

      if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

      const document = await prisma.document.findUnique({
        where: {
          id: documentId,
        },
      });

      if (!document) return c.json({ error: "Document not found" }, 404);

      if (
        document.ownerId !== auth.userId ||
        !!(
          document.organizationId &&
          (document.organizationId !== auth.orgId ||
            auth.orgRole !== "org:admin")
        )
      ) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const updatedDocument = await prisma.document.update({
        where: {
          id: document.id,
          ownerId: auth.userId,
        },
        data: {
          title: title ?? undefined,
          initialContent: content ?? undefined,
        },
      });

      return c.json({ data: updatedDocument });
    }
  )
  .delete("/:documentId", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    const { documentId } = c.req.param();

    if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

    const document = await prisma.document.findUnique({
      where: {
        id: documentId,
      },
    });

    if (!document) return c.json({ error: "Document not found" }, 404);

    if (document.ownerId !== auth.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const deletedDocument = await prisma.document.delete({
      where: {
        id: document.id,
        ownerId: auth.userId,
      },
    });

    return c.json({ data: deletedDocument });
  });

export default app;
