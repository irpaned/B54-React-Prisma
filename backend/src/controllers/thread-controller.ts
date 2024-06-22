import { Request, Response } from "express";
import ThreadService from "../service/thread-service";
import { UserJWTPayload } from "../types/auth";
import { redisClient } from "../libs/redis";
import { log } from "console";



    async function find(req: Request, res: Response) {
    try {
        const threads = await ThreadService.find()
        // SET REDIS (STEP 2)
        // ini untuk memasukkan data threads ke redis
        // await redisClient.set("THREADS_DATA", JSON.stringify(threads));
        return res.json(threads);
    }   catch (error) {
        res.status(500).json({ message : error.message })
        }
    }

    


    async function findOne (req: Request, res: Response) {
        
        try {
            const { id } = req.params;
            const threads = await ThreadService.findOne(Number(id))

            if(!threads) {
                return res.status(404).json({ message : "Thread not found" })
            }

            res.json(threads);
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }


    async function findManyProfile (req: Request, res: Response) {
        
        try {
            // const user = res.locals.user
            const { id } = req.params;
            const threads = await ThreadService.findManyProfile(Number(id))
            
            if(!threads) {
                return res.status(404).json({ message : "Thread not found" })
            }

            res.json(threads);
        } catch (error) {
            res.status(500).json({ message : error.message })
        }
    }


    async function create(req: Request, res: Response)  {
        // "multipart/form-data" : ini agar file gambar bisa menjadi file upload

        /*  #swagger.requestBody = {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                        $ref: "#/components/schemas/CreateThreadDTO"
                        }  
                    }
                }
            } 
        */
        
        try {
            //              👇 ambil data dari authenticate ( menggunakan relasi user step 4)
            const user = res.locals.user as UserJWTPayload
            const body = {
                ...req.body,
                image: req.file? req.file.path : "",
            } 
            // ini berfungsi untuk menghapus keys THREADS_DATA setiap ada yang post, bertujuan agar cache redis lebih update dengan data yg baru di post
            // await redisClient.del("THREADS_DATA");
            //                                                      👇passing datanya disini(menggunakan relasi user step 5)         
            const createdThread = await ThreadService.create(body, user.id);

            res.status(201).json(createdThread);
        } catch (error) {
            console.log(error);
          res.status(500).json({ message: error.message });
          
          
        }
    }


    async function update(req: Request, res: Response) {
        try {

        const { id } = req.params
        
        // pengecekan
        const thread = await ThreadService.findOne(Number(id))

        if(!thread) res.status(404).json({
            message : "Thread not found!"
        })
        // pengecekan

        const updatedThread = await ThreadService.update(Number(id), req.body);
        res.json(updatedThread)

        } catch (error) {
            res.status(500).json({
                message : error
            })
        }

        

    }

    

    async function remove (req: Request, res: Response) {
        try {
            const { id } = req.params;
            
            // pengecekan
            const thread = await ThreadService.findOne(Number(id))

            if(!thread) res.status(404).json({
                message : "Thread not found!"
            })
            // pengecekan

        const DeleteThreads = await ThreadService.remove(Number(id))
        res.json(DeleteThreads);

        } catch (error) {
            res.status(500).json({
                message : error
            })
        }
        
    }

    
// di export untuk di panggil di index.ts (routing)
export default {find, findOne, create, update, remove, findManyProfile} ;