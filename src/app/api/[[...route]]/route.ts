import { Hono } from "hono";
import { handle } from "hono/vercel";

import documents from "@/features/documents/core/server/route";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/documents", documents);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type TApp = typeof routes;
