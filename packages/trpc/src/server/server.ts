import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  todo: t.router({
    getToDoById: publicProcedure.input(z.object({ id: z.string() })).output(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      completed: z.boolean(),
      createdAt: z.string(),
      dueDate: z.string().optional(),
      priority: z.enum(['low', 'medium', 'high']).optional()
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});
export type AppRouter = typeof appRouter;

