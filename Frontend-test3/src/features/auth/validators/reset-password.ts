import { z } from "zod";

// set up zod
export const ResetPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});
