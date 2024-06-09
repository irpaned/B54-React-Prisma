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

        res.status(201).json(user);
    } catch (error) {
        res.json({
            message : error,
        })
    };  
}


async function check(req: Request, res: Response) {
    try {
      res.json(res.locals.user);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

export default { login, register, check }