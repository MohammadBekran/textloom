import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Liveblocks } from "@liveblocks/node";
import { Hono } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const liveblocks = new Liveblocks({
  secret: process.env.NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY!,
});

const app = new Hono()
  .post(
    "/liveblocks-auth",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        room: z.string(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);
      if (!auth?.sessionClaims) return c.json({ error: "Unauthorized" }, 401);

      const user = await currentUser();

      const { room } = c.req.valid("json");
      const document = await prisma.document.findUnique({
        where: {
          id: room,
        },
      });

      if (!document) return c.json({ error: "Unauthorized" }, 401);

      const isOwner = document.ownerId === auth.userId;
      const isOrganizationMember = !!(
        document.organizationId && document.organizationId === auth.orgId
      );

      if (!isOwner && !isOrganizationMember) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const session = liveblocks.prepareSession(auth.userId, {
        userInfo: {
          name: user?.fullName ?? "Anonymous",
          avatar: user?.imageUrl,
        },
      });

      session.allow(room, session.FULL_ACCESS);

      const { body, status } = await session.authorize();
      const parsedBody = JSON.parse(body) as { token: string };

      return c.json(parsedBody, { status: status as ContentfulStatusCode });
    }
  )
  .get("/users", clerkMiddleware(), async (c) => {
    try {
      const auth = getAuth(c);
      if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

      const clerk = await clerkClient();

      const usersList = await clerk.users.getUserList({
        organizationId: [auth.orgId as string],
      });

      const users = usersList.data.map((user) => ({
        id: user.id,
        name:
          user.fullName ??
          user.primaryEmailAddress?.emailAddress ??
          "Anonymous",
        avatar: user.imageUrl,
        color: "",
      }));

      return c.json({
        data: users,
      });
    } catch {
      return c.json({ error: "Failed to fetch users" }, 400);
    }
  });

export default app;
