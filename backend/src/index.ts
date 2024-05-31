import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express, { Request, Response } from "express";



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

    routerv1.get("/threads", async (req: Request, res: Response) => {
        try {
            const threads = await prisma.thread.findMany();
        res.json(threads);

        } catch (error) {
            res.json({
                message : error
            })
        }
        
        
    })

    routerv1.get("/threads/:id", async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const threads = await prisma.thread.findFirst({
                where: { id : Number(id) },
            });
            res.json(threads);

        } catch (error) {
            res.json({
                message : error
            })
        }
        
      
    })

    routerv1.delete("/threads/:id", async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const thread = await prisma.thread.count({
                where: { id : Number (id) },
            });

            if(!thread) return res.status(500).json( {message : "Thread not found!"} )

        const DeleteThreads = await prisma.thread.delete({
            where: { id : Number(id) },
        });
        res.json(DeleteThreads);

        } catch (error) {
            res.json({
                message : error
            })
        }
        
    })

    type CreateThreadDTO = {
        content : string,
        avatar : string,
        image : string,
        numberOfReplies : number, 
        numberOfLike : number,
        numberOfShare : number

    };

    routerv1.post("/threads", async (req: Request, res: Response) => {
        try {
            const dto = req.body as CreateThreadDTO;

            const threads = await prisma.thread.create({
                data: { ...dto  },
            });

            res.json(threads);
        } catch (error) {
            res.json({
                message : error,
            })
        };  
    });

    routerv1.patch("/threads/:id", async (req: Request, res: Response) => {
        try {
            const { id } = req.params; 
            const dto = req.body as CreateThreadDTO;

            const thread = await prisma.thread.findFirst({
                where: { id : Number (id) },
            });

            if(!thread) return res.status(500).json( {message : "Thread not found!"} )

            // ini 👇 cara bacanya : kalau misalkan gaada berarti gausah di update, kalau ada baru diupdate
            if (dto.content) { 
                thread.content = dto.content;
            }

            if (dto.avatar) { 
                thread.avatar = dto.avatar;
            }

            if (dto.image) { 
                thread.image = dto.image;
            }

            if (dto.numberOfReplies) { 
                thread.numberOfReplies = dto.numberOfReplies;
            }

            if (dto.numberOfLike) { 
                thread.numberOfLike = dto.numberOfLike;
            }

            if (dto.numberOfShare) { 
                thread.numberOfShare = dto.numberOfShare;
            }

            const updatedThread = await prisma.thread.update({
                where : { id : Number(id) },
                data : { ...thread }
            }); 

            res.json(updatedThread);

        } catch (error) {
            res.json({
                message : error,
            })
        };  
    });





    // v2
    routerv2.get("/", (req: Request, res: Response) => {
        res.send("Welcome to v2")
    })




    
    app.listen(port, () => {
        console.log(`Server is running on PORT ${port}`);
    })
    


