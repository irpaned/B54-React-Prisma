import { Request, Response } from "express";
import UserService from "../service/user";

async function find(req: Request, res: Response) {
  try {
    
    const search = req.query.search as string; //  bikin const ( query string step 1)
    const users = await UserService.find(search);
    return res.json(users); 
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export default { find };