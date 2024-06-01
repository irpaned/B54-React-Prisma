import { Request, Response } from "express";
import ThreadService from "../service/thread"

import {  CreateThreadDTO, UpdateThreadDTO } from "../dto/thread-dto";



    async function find(req: Request, res: Response) {
    try {
        const threads = await ThreadService.find()
        return res.json(threads);
    }   catch (error) {
        return error;
        }
    }

    async function findOne (req: Request, res: Response) {
        try {
            const { id } = req.params;

            const threads = await ThreadService.findOne(Number(id))

            res.json(threads);
        } catch (error) {
            res.json(error)
        }
    }


    async function create(req: Request, res: Response)  {
        try {
            const createdThread = await ThreadService.create(req.body);

            res.json(createdThread);
        } catch (error) {
            res.json({
                message : error,
            })
        };  
    }

    async function update(req: Request, res: Response) {
        try {

        const { id } = req.params
        
        // pengecekan
        const thread = await ThreadService.findOne(Number(id))

        if(!thread) res.json({
            message : "Thread not found!"
        })
        // pengecekan

        const updatedThread = await ThreadService.update(Number(id), req.body);
        res.json(updatedThread)

        } catch (error) {
            res.json({
                message : error
            })
        }

        

    }

    async function remove (req: Request, res: Response) {
        try {
            const { id } = req.params;
            
            // pengecekan
            const thread = await ThreadService.findOne(Number(id))

            if(!thread) res.json({
                message : "Thread not found!"
            })
            // pengecekan

        const DeleteThreads = await ThreadService.remove(Number(id))
        res.json(DeleteThreads);

        } catch (error) {
            res.json({
                message : error
            })
        }
        
    }


export default {find, findOne, create, update, remove} ;