import { PrismaClient } from "@prisma/client";
import { CreateThreadDTO, UpdateThreadDTO } from "../dto/thread-dto";
import { createThreadSchema } from "../validators/thread";
import { error } from "console";

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

            if(!thread) return null;

            return thread;
        }   catch (error) {
            return error;
            }
        }

    async function create(dto : CreateThreadDTO) {
        try {
            // validasi menggunakan joi
           const validate = createThreadSchema.validate(dto) 

           if(validate.error) {
            return validate.error.details
           }

            return await prisma.thread.create({
                data: { ...dto  },
            });
        } catch (error) {
            return error
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

        if (dto.avatar) { 
            thread.avatar = dto.avatar;
        }

        if (dto.image) { 
            thread.image = dto.image;
        }

        if (dto.numberOfReplies) { 
            thread.numberOfReplies = dto.numberOfReplies;
        }

        if (dto.numberOfLike) { 
            thread.numberOfLike = dto.numberOfLike;
        }

        if (dto.numberOfShare) { 
            thread.numberOfShare = dto.numberOfShare;
        }

        return await prisma.thread.update({
            where : { id : Number(id) },
            data : { ...thread }
        }); 

       } catch (error) {
            return error
       }
       
        


    };  

    async function remove (id : number) {
        try {
            return await prisma.thread.delete({
                where: { id : Number(id) },
            });

        } catch (error) {
            return error
        }
        
    }
    


export default { find, findOne, create, update, remove};



