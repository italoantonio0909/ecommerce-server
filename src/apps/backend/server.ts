import express, { Router } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import * as http from 'http';
import { registerRoutes } from './routes/index';

export class Server {

    private express: express.Express;
    public httpServer?: http.Server;
    private port: number;

    constructor(port: number) {
        this.port = port;
        this.express = express();
        this.express.use(morgan("dev"));
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(bodyParser.json());
        this.express.use(cors({ origin: 'http://localhost:4200' }));
        const router = Router();
        router.use(errorHandler());
        this.express.use(router);

        registerRoutes(router);

        router.use((err: any, req: any, res: any, next: any) => {
            res.status(500).json({ message: err.message });
        });
    }

    async listen(): Promise<void> {
        return new Promise(resolve => {
            this.httpServer = this.express.listen(this.port, () => {
                console.log(`🔥 Server listening on port ${this.port}`);
                resolve();
            });
        });
    }
}
