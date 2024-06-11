import { z } from "zod";

 // set up zod
 export const LoginSchema = z.object({
  email : z
  .string()
  .email(),
  password : z
  .string()
  .min(4)

})