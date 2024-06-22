// ini untuk validasi upload

import { z } from "zod";

// const MAX_FILE_SIZE = 5000000; // ini maksudnya 5mb
// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",  
//   "image/webp",
// ];

export const createThreadSchemaZod = z.object({

  content: z.string().min(1).max(280),

  image: z
  .any()
  // .refine(
  //   (files) => files?.[0]?.size <= MAX_FILE_SIZE,
  //   `Max file size is 5MB.`
  // )
  // .refine(
  //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //   ".jpg, .jpeg, .png and .webp files are accepted."
  // )
});