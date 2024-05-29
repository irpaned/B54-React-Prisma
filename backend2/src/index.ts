import { AppDataSource } from "./data-source";
import cors from "cors";
import express, { Request, Response } from "express";

AppDataSource.initialize().then(async () => {

    const app = express();
    const port = 3000;

    app.use(cors());

    app.get("/test", (req: Request, res: Response) => {
        res.json([
        {
            title : "halo",
            description : "description"
        },
      ]);
    });
    
    app.listen(port, () => {
        console.log(`Server is running on PORT ${port}`);
    })
    

}).catch(error => console.log(error))
