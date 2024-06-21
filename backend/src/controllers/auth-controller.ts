import { Request, Response } from "express";
import AuthService from "../service/auth-service"
import jwt from "jsonwebtoken";
import { transporter } from "../libs/nodemailer";
// import { transporter } from "../libs/nodemailer";

async function login(req: Request, res: Response)  {

    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                       $ref: "#/components/schemas/LoginDTO"
                    }  
                }
            }
        } 
    */


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
    // day 15
     /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                       $ref: "#/components/schemas/RegisterDTO"
                    }  
                }
            }
        } 
    */

    
    
    try {
        const user = await AuthService.register(req.body);

        const token = jwt.sign(user.id.toString(), process.env.JWT_SECRET); // : eyskjfnskjfnskf
        const fullUrl = req.protocol + "://" + req.get("host");
        
        const info = await transporter.sendMail({
          from: '"Circle" <muhammadirfan2823@gmail.com>', // sender address
          to: user.email, // list of receivers
          subject: "Verification Link", // Subject line
          html: `<a href="${fullUrl}/api/v1/auth/verify-email?token=${token}">Klik untuk verifikasi email!</a>`, // html body
        });
    
        console.log("Message sent: %s", info.messageId);
    
        await AuthService.createVerification(token, "EMAIL");

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

  async function verifyEmail(req: Request, res: Response) {
    try {
      const token = req.query.token as string;
      await AuthService.verify(token);
      const frontendUrl = process.env.FRONTEND_URL;
      res.redirect(`${frontendUrl}/auth/login`); // ini agar setelah verify akan langsung di arah kan ke auth login di frontend
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }


export default { login, register, check, verifyEmail }