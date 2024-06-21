import { Request, Response } from "express";
import UserService from "../service/user-service";
import { editProfileDTO } from "../dto/auth-dto";

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



async function findOneProfile (req: Request, res: Response) {
        
  try {
      const { id } = req.params;
      const user = await UserService.findOneProfile(Number(id))

      if(!user) {
          return res.status(404).json({ message : "User not found ya" })
      }

      res.json(user);
  } catch (error) {
      res.status(500).json({ message : error.message })
  }
}

async function updateProfile(req: Request, res: Response) {
  try {

  const { id } = req.params
  
  // pengecekan
  const user = await UserService.findOneProfile(Number(id))

  if(!user) res.status(404).json({
      message : "Thread not found!"
  })
  
  const editedProfile = await UserService.updateProfile(Number(id), req.body);
  res.json(editedProfile)

  } catch (error) {
      res.status(500).json({
          message : error
      })
  }

}

export default { find, updateProfile, findOneProfile };