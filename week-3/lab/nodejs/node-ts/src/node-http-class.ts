// Import Node.js built-in HTTP module and its types
import http, { IncomingMessage, ServerResponse } from "http";

class Server {
    private port: number;
    private server: http.Server;

    constructor(port: number = 5000) {
        this.port = port;

        // Bind the request handler to keep "this" context inside the class
        this.server = http.createServer(this.requestHandler.bind(this));
    }

    // Main request handler
    private requestHandler(req: IncomingMessage, res: ServerResponse): void {
        res.setHeader("Content-Type", "application/json");

        if (req.url === "/" && req.method === "GET") {
            res.statusCode = 200;
            res.end(
                JSON.stringify({
                    message: "Welcome to my Node.js TypeScript server!",
                })
            );
        } else if (req.url === "/about" && req.method === "GET") {
            res.statusCode = 200;
            res.end(
                JSON.stringify({
                    message:
                        "About this server: built using Node.js and TypeScript",
                })
            );
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "Route not found" }));
        }
    }

    // Start the server
    public start(): void {
        this.server.listen(this.port, () => {
            console.log(
                `✅ Server is running on http://localhost:${this.port}`
            );
        });
    }
}

// Create and start the server instance
const myServer = new Server(3000);
myServer.start();
