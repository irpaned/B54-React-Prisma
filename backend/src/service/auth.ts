import { PrismaClient } from "@prisma/client";
import { LoginDTO, registerDTO } from "../dto/auth-dto";
import { loginSchema, registerSchema } from "../validators/auth";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { error } from "console";

    const prisma = new PrismaClient();


    async function login(dto : LoginDTO) {
        try {
            // validasi (apakah yang dimasukkan sudah benar atau tidak sesuai validasi yg kita buat) menggunakan joi
           const validate = loginSchema.validate(dto) 

           if(validate.error) {
            return validate.error.details
           }

        //  cek apakah ada usernya ada atau tidak
           const user = await prisma.user.findUnique({
            where : {
                email : dto.email
            }
           })

           if(!user) {
            throw new Error("User not found!")
           }

           // compare password serta cek validnya
           const isValidPassword = await bcrypt.compare(dto.password, user.password)

           if(!isValidPassword) throw new Error ("User not found!")


            delete user.password

            const jwtSecret = process.env.JWT_SECRET;
            
           // jangan masukkan data2 yg sensitif di jwt
           const token = jwt.sign(user, jwtSecret)

            return { token, user }
        } catch (error) {
            return error
        }
        
    }

    async function register(dto : registerDTO) {
        try {
            // validasi menggunakan joi
           const validate = registerSchema.validate(dto) 

            const salt = 10
            const hashedPassword = await bcrypt.hash(dto.password, salt)

            dto.password = hashedPassword

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

    // async function create(dto : registerDTO) {
    //     try {
    //         // validasi menggunakan joi
    //        const validate = createThreadSchema.validate(dto) 

    //        if(validate.error) {
    //         return validate.error.details
    //        }

    //         return await prisma.thread.create({
    //             data: { ...dto  },
    //         });
    //     } catch (error) {
    //         return error
    //     }
        
    // }


export default { login, register};



