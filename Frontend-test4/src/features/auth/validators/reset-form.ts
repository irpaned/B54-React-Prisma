import { z } from "zod";

// set up zod
export const ResetFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email!" }),
});
