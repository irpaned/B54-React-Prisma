import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express, { Request, Response } from "express";
import ThreadController from "./controllers/thread-controller"
import UserController from "./controllers/user-controller"
import AuthController from "./controllers/auth-controller"
import dotenv from "dotenv"
import { upload } from "./middlewares/upload-file";
import { authenticate } from "./middlewares/authenticate";
// kita eksekusi default
dotenv.config()

    const app = express();
    const port = 5000;
    const routerv1 = express.Router();
    const routerv2 = express.Router();
    const prisma = new PrismaClient()

    app.use(cors());
    app.use(express.json())
    app.use("/api/v1", routerv1)
    app.use("/api/v2", routerv2)
    app.use("/uploads", express.static("uploads"))

    app.get("/", (req: Request, res: Response) => {
        res.send("Hello welcome to circle");
    });

    // v1
    routerv1.get("/", (req: Request, res: Response) => {
        res.send("Welcome to v1")
    })

    routerv1.get("/threads", authenticate, ThreadController.find);
    routerv1.get("/threads/:id", authenticate, ThreadController.findOne);
    routerv1.get("/threads/profile/:id", authenticate, ThreadController.findManyProfile);
    routerv1.delete("/threads/:id", authenticate, ThreadController.remove)
    routerv1.post("/threads", authenticate, upload.single("image"), ThreadController.create);
    routerv1.patch("/threads/:id", authenticate, ThreadController.update);


    routerv1.post("/auth/login",  AuthController.login);
    routerv1.post("/auth/register", AuthController.register);
    routerv1.post("/auth/check", authenticate, AuthController.check);
    
    routerv1.get("/users", UserController.find);

    // v2
    routerv2.get("/", (req: Request, res: Response) => {
        res.send("Welcome to v2")
    })




    
    app.listen(port, () => {
        console.log(`Server is running on PORT ${port}`);
    })
    


