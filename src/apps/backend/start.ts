import { Server } from "./server";

export class BackendApp {
    server?: Server;

    async start() {
        const port = parseInt(process.env.PORT) || 8000;
        this.server = new Server(port);
        return this.server.listen();
    }
}