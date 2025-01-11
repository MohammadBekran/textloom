import { hc } from "hono/client";

import { TApp } from "@/app/api/[[...route]]/route";

export const client = hc<TApp>(process.env.NEXT_PUBLIC_APP_URL!);
