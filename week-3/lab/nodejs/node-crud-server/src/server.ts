import http, { IncomingMessage, ServerResponse } from "http";
import { parse as parseUrl } from "url";

// Define a User interface
interface User {
    id: number;
    name: string;
    email: string;
}

// Main Server class
class AppServer {
    private users: User[] = [];
    private server: http.Server;

    constructor(private port: number) {
        this.server = http.createServer(this.handleRequest.bind(this));
    }

    // Start the server
    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`);
        });
    }

    // Handle incoming requests
    private async handleRequest(req: IncomingMessage, res: ServerResponse) {
        const parsedUrl = parseUrl(req.url || "", true);
        const pathname = parsedUrl.pathname || "";

        try {
            if (pathname === "/users" && req.method === "POST") {
                return this.createUser(req, res);
            }

            if (pathname === "/users" && req.method === "GET") {
                return this.getAllUsers(res);
            }

            if (pathname.startsWith("/users/") && req.method === "GET") {
                return this.getUser(req, res, pathname);
            }

            if (pathname.startsWith("/users/") && req.method === "PUT") {
                return this.updateUser(req, res, pathname);
            }

            if (pathname.startsWith("/users/") && req.method === "DELETE") {
                return this.deleteUser(res, pathname);
            }

            // Default 404
            this.sendJSON(res, 404, { error: "Route not found" });
        } catch (err) {
            this.sendJSON(res, 500, { error: "Internal server error" });
        }
    }

    // Helper to send JSON responses
    private sendJSON(res: ServerResponse, statusCode: number, data: any): void {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
    }

    // Helper to parse request body
    private parseBody(req: IncomingMessage): Promise<any> {
        return new Promise((resolve, reject) => {
            let body = "";
            req.on("data", (chunk) => (body += chunk.toString()));
            req.on("end", () => {
                try {
                    resolve(body ? JSON.parse(body) : {});
                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    // === CRUD Methods ===
    private async createUser(req: IncomingMessage, res: ServerResponse) {
        try {
            const body = await this.parseBody(req);
            if (!body.name || !body.email) {
                return this.sendJSON(res, 400, {
                    error: "name and email are required",
                });
            }

            const newUser: User = {
                id: this.users.length + 1,
                name: body.name,
                email: body.email,
            };
            this.users.push(newUser);
            this.sendJSON(res, 201, newUser);
        } catch {
            this.sendJSON(res, 400, { error: "Invalid JSON format" });
        }
    }

    private getAllUsers(res: ServerResponse) {
        this.sendJSON(res, 200, this.users);
    }

    private getUser(
        req: IncomingMessage,
        res: ServerResponse,
        pathname: string
    ) {
        const id = parseInt(pathname.split("/")[2] || "0");
        const user = this.users.find((u) => u.id === id);
        user
            ? this.sendJSON(res, 200, user)
            : this.sendJSON(res, 404, { error: "User not found" });
    }

    private async updateUser(
        req: IncomingMessage,
        res: ServerResponse,
        pathname: string
    ) {
        try {
            const id = parseInt(pathname.split("/")[2] || "0");
            const body = await this.parseBody(req);
            const user = this.users.find((u) => u.id === id);

            if (!user)
                return this.sendJSON(res, 404, { error: "User not found" });

            if (body.name) user.name = body.name;
            if (body.email) user.email = body.email;

            this.sendJSON(res, 200, user);
        } catch {
            this.sendJSON(res, 400, { error: "Invalid JSON format" });
        }
    }

    private deleteUser(res: ServerResponse, pathname: string) {
        const id = parseInt(pathname.split("/")[2] || "0");
        const index = this.users.findIndex((u) => u.id === id);

        if (index === -1)
            return this.sendJSON(res, 404, { error: "User not found" });

        const deletedUser = this.users.splice(index, 1)[0];
        this.sendJSON(res, 200, { message: "User deleted", deletedUser });
    }
}

// === Start Server ===
const server = new AppServer(5000);
server.start();
