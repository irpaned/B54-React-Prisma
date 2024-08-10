import { z } from "zod";

// set up zod
export const EditProfileSchema = z.object({
  fullName: z.string().min(1).max(30),

  userName: z.string().min(4).max(30),

  bio: z.string().max(280),

  photoProfile: z.string(),
});
