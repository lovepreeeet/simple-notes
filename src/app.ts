import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import userRouter from "./modules/user/user.routes";
import taskRouter from "./modules/task/task.routes";
import { errorMiddleware } from "./middlewares";
import { NotFoundException } from "./exceptions/http.exception";
import { COMMON_MESSAGES } from "./constants";

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    private initializeMiddlewares() {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json())
    }

    private initializeErrorHandling() {
        this.app.use((req, res, next) => {
            next(new NotFoundException(COMMON_MESSAGES.ROUTE_NOT_FOUND))
        })
        this.app.use(errorMiddleware);
    }

    private initializeRoutes() {
        this.app.get("/", (req: Request, res: Response) => {
            res.send("api is running");
        })
        this.app.use("/api/v1/user", userRouter)
        this.app.use("/api/v1/task", taskRouter);

    }
}

export default new App().app;