import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express, { Request, Response } from "express";
import ThreadController from "./controllers/thread"
import AuthController from "./controllers/auth"

    const app = express();
    const port = 5000;
    const routerv1 = express.Router();
    const routerv2 = express.Router();
    const prisma = new PrismaClient()

    app.use(cors());
    app.use(express.json())
    app.use("/api/v1", routerv1)
    app.use("/api/v2", routerv2)

    app.get("/", (req: Request, res: Response) => {
        res.send("Hello welcome to circle");
    });

    // v1
    routerv1.get("/", (req: Request, res: Response) => {
        res.send("Welcome to v1")
    })

    routerv1.get("/threads", ThreadController.find);
    routerv1.get("/threads/:id", ThreadController.findOne);
    routerv1.delete("/threads/:id", ThreadController.remove)
    routerv1.post("/threads", ThreadController.create);
    routerv1.patch("/threads/:id", ThreadController.update);


    routerv1.get("/auth/login", AuthController.login);
    routerv1.get("/auth/register", AuthController.register);

    // v2
    routerv2.get("/", (req: Request, res: Response) => {
        res.send("Welcome to v2")
    })




    
    app.listen(port, () => {
        console.log(`Server is running on PORT ${port}`);
    })
    


