import { Request, Response } from "express";
import AuthService from "../service/auth"

async function login(req: Request, res: Response)  {
    try {
        const user = await AuthService.login(req.body);

        res.json(user);
    } catch (error) {
        res.json({
            message : error,
        })
    };  
}

async function register(req: Request, res: Response)  {
    try {
        const user = await AuthService.register(req.body);

        res.json(user);
    } catch (error) {
        res.json({
            message : error,
        })
    };  
}

export default { login, register }