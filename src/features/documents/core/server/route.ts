import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const app = new Hono()
  .get(
    "/",
    clerkMiddleware(),
    zValidator(
      "query",
      z.object({
        search: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { search } = c.req.valid("query");

      if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

      const documents = await prisma.document.findMany({
        where: {
          ownerId: auth.userId,
          organizationId: auth.orgId ?? undefined,
          ...(search && { title: { contains: search, mode: "insensitive" } }),
        },
      });

      return c.json({ data: documents });
    }
  )
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
        title: z.string(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { documentId } = c.req.param();
      const { title } = c.req.valid("json");

      if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

      const document = await prisma.document.findUnique({
        where: {
          id: documentId,
        },
      });

      if (!document) return c.json({ error: "Document not found" }, 404);

      console.log(auth.orgRole);

      if (
        document.ownerId !== auth.userId ||
        (document.organizationId &&
          (document.organizationId !== auth.orgId || auth.orgRole !== "admin"))
      ) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const updatedDocument = await prisma.document.update({
        where: {
          id: document.id,
          ownerId: auth.userId,
        },
        data: {
          title,
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
