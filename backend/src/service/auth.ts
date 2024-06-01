import { PrismaClient } from "@prisma/client";
import { LoginDTO, registerDTO } from "../dto/auth-dto";
import { createThreadSchema } from "../validators/thread";
import { error } from "console";
import { loginSchema, registerSchema } from "../validators/auth";

    const prisma = new PrismaClient();


    async function login(dto : LoginDTO) {
        try {
            // validasi menggunakan joi
           const validate = loginSchema.validate(dto) 

           if(validate.error) {
            return validate.error.details
           }

            return await prisma.user.create({
                data: { ...dto  },
            });
        } catch (error) {
            return error
        }
        
    }

    async function register(dto : registerDTO) {
        try {
            // validasi menggunakan joi
           const validate = registerSchema.validate(dto) 

           if(validate.error) {
            return validate.error.details
           }

            return await prisma.user.create({
                data: { ...dto  },
            });
        } catch (error) {
            return error
        }
        
    }


export default { login, register};



