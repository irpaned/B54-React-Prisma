import { Request, Response } from "express";
import ThreadService from "../service/thread"

import {  CreateThreadDTO, UpdateThreadDTO } from "../dto/thread-dto";
import path from "path";



    async function find(req: Request, res: Response) {
    try {
        const threads = await ThreadService.find()
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


    async function create(req: Request, res: Response)  {
        try {

            const body = {
                ...req.body,
                image: req.file? req.file.path : "",
            } 
            const createdThread = await ThreadService.create(body);

            res.status(201).json(createdThread);
        } catch (error) {
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


export default {find, findOne, create, update, remove} ;