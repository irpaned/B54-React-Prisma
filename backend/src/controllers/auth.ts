import { Request, Response } from "express";
import ThreadService from "../service/thread"

async function login(req: Request, res: Response)  {
    try {
        const createdThread = await ThreadService.create(req.body);

        res.json(createdThread);
    } catch (error) {
        res.json({
            message : error,
        })
    };  
}

async function register(req: Request, res: Response)  {
    try {
        const createdThread = await ThreadService.create(req.body);

        res.json(createdThread);
    } catch (error) {
        res.json({
            message : error,
        })
    };  
}

export default { login, register }