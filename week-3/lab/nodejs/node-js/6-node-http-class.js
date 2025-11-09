// Import the built-in http module
const http = require("http");

class Server {
    constructor(port) {
        this.port = port || 5000;
        this.server = http.createServer(this.requestHandler.bind(this));
    }

    // Handle incoming requests
    requestHandler(req, res) {
        res.setHeader("Content-Type", "application/json");

        if (req.url === "/" && req.method === "GET") {
            res.statusCode = 200;
            res.end(
                JSON.stringify({
                    message: "Welcome to my Node.js class server!",
                })
            );
        } else if (req.url === "/about" && req.method === "GET") {
            res.statusCode = 200;
            res.end(
                JSON.stringify({
                    message:
                        "About this server: built using Node.js and classes",
                })
            );
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "Route not found" }));
        }
    }

    // Start the server
    start() {
        this.server.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}

// Create and start the server instance
const myServer = new Server(5000);
myServer.start();
