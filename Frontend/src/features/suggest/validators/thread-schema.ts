import { z } from "zod";

export const createThreadSchemaZod = z.object({
  content: z.string().min(1).max(280),

  image: z.any(),
});
