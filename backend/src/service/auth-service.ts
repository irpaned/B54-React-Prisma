import { PrismaClient, VerificationType } from "@prisma/client";
// import { PrismaClient, VerificationType } from "@prisma/client";
import { LoginDTO, registerDTO } from "../dto/auth-dto";
import { loginSchema, registerSchema } from "../validators/auth";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { error } from "console";
import { transporter } from "../libs/nodemailer";

    const prisma = new PrismaClient();


    async function login(dto : LoginDTO) {
        try {
            // validasi (apakah yang dimasukkan sudah benar atau tidak sesuai validasi yg kita buat) menggunakan joi
           const validate = loginSchema.validate(dto) 

           if(validate.error) {
            throw new String(validate.error.message);
           }

        //  cek apakah ada usernya ada atau tidak
           const user = await prisma.user.findUnique({
            where : {
                email : dto.email
            }
           })

        // jika user verifiednya false maka tidak bisa login
           if (!user.isVerified) throw new Error("User is not verified");

           if(!user) throw new String("User not found!")
           

           // compare password serta cek validnya
           const isValidPassword = await bcrypt.compare(dto.password, user.password)

           if(!isValidPassword) throw new Error ("User not found!")

            // ini agar ketika kita find user
            delete user.password

            const jwtSecret = process.env.JWT_SECRET;
            
           // jangan masukkan data2 yg sensitif di jwt
        //    membuat token dari data user
           const token = jwt.sign(user, jwtSecret)

            return { token, user }
        } catch (error) {
            throw new String(error);
        }
        
    }

    async function register(dto : registerDTO) {
        try {
            // 1. validasi menggunakan joi, apakah sudah sesuai dengan DTO yg kita buat
           const validate = registerSchema.validate(dto) 

           // 2. setelah itu kita hashed
            const salt = 10
            const hashedPassword = await bcrypt.hash(dto.password, salt)

            dto.password = hashedPassword

            
           if(validate.error) {
            throw new String("User not found!")
           }

            return await prisma.user.create({
                data: { ...dto  },
            });
        } catch (error) {
            throw new String(error);
        }
        
    }

    async function createVerification(token: string, type: VerificationType) {
        try {
          return await prisma.verification.create({
            data: {
              token,
              type,
            },
          });
        } catch (error) {
          throw new Error(error.message || "Failed to retrieve users");
        }
      }

      async function verify(token: string) {
        try {
          const verification = await prisma.verification.findUnique({
            where: { token },
          });
          const userId = jwt.verify(verification.token, process.env.JWT_SECRET);
      
          if (verification.type === "FORGOT_PASSWORD") {
            return;
          }
      
          return await prisma.user.update({
            data: {
              isVerified: true,
            },
            where: {
              id: Number(userId),
            },
          });
        } catch (error) {
          throw new Error(error.message || "Failed to verify email");
        }
      }

     
      


export default { login, register, verify, createVerification};




