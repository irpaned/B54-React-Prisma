// disini adalah kumpulan logic, bukan tempat mengembalikan respon

import { PrismaClient } from "@prisma/client";
import { CreateThreadDTO, UpdateThreadDTO } from "../dto/thread-dto";
import { createThreadSchema } from "../validators/thread";
import { error } from "console";
import { v2 as cloudinary } from "cloudinary";
import thread from "../controllers/thread";

    const prisma = new PrismaClient();

    async function find() {
    try {
        return await prisma.thread.findMany();
    }   catch (error) {
        return error;
        }
    }

    async function findOne( id : number ) {
        try {
           const thread = await prisma.thread.findFirst({
                where: { id },
            });

            if(!thread) throw new String("Thread not found!");;

            return thread;
        }   catch (error) {
            throw new String(error);
            }
        }


    async function create(dto: CreateThreadDTO) {
        try {
        //   validasi menggunakan joi
          const validate = createThreadSchema.validate(dto);
      
          if (validate.error) {
            throw new String(validate.error.message);
          }
      
          cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
          });
      
          const upload = await cloudinary.uploader.upload(dto.image, {
            upload_preset: "b54circle",
          });
      
          return await prisma.thread.create({
            data: { ...dto, image : upload.secure_url },

            
          });
        } catch (error) {
          throw new String(error);
        }
      }

    async function update(id : number, dto : UpdateThreadDTO) {
       try {
        const thread = await prisma.thread.findFirst({
            where: { id : Number (id) },
        });


        // ini 👇 cara bacanya : kalau misalkan gaada berarti gausah di update, kalau ada baru diupdate 
        if (dto.content) { 
            thread.content = dto.content;
        }


        if (dto.image) { 
            thread.image = dto.image;
        }

        return await prisma.thread.update({
            where : { id : Number(id) },
            data : { ...thread }
        }); 

       } catch (error) {
            throw new String(error);
       }
       
    

    };  

    async function remove (id : number) {
        try {
            return await prisma.thread.delete({
                where: { id : Number(id) },
            });

        } catch (error) {
            throw new String(error)
        }
        
    }
    

export default { find, findOne, create, update, remove};



