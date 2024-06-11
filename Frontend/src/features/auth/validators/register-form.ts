import { z } from "zod";

 // set up zod
 export const RegisterSchema = z.object({
  email : z
  .string({message : "Email harus berupa string!"})
  .email({message : "Mohon masukkan email yang valid!"}),
  
  password : z
  .string()
  .min(4),

  fullName : z
  .string().min(3),
  
  userName : z
  .string()
  .min(4)

})