import http from "http";
import url from "url";
import mysql from "mysql2/promise";

// Interfaces
interface User {
    id?: number;
    name: string;
    email: string;
}

interface ResponseData {
    [key: string]: any;
}

// Database Service Class
class DatabaseService {
    private pool: mysql.Pool;

    constructor() {
        this.pool = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "password1",
            database: "node_server",
        });
    }

    async createUser(name: string, email: string): Promise<number> {
        const [result] = await this.pool.query(
            "INSERT INTO users (name, email) VALUES (?, ?)",
            [name, email]
        );
        return (result as mysql.ResultSetHeader).insertId;
    }

    async getAllUsers(): Promise<User[]> {
        const [rows] = await this.pool.query("SELECT * FROM users");
        return rows as User[];
    }

    async getUserById(id: number): Promise<User | null> {
        const [rows] = await this.pool.query(
            "SELECT * FROM users WHERE id = ?",
            [id]
        );
        const users = rows as User[];
        return users.length > 0 ? users[0] : null;
    }

    async updateUser(id: number, name: string, email: string): Promise<void> {
        await this.pool.query(
            "UPDATE users SET name = ?, email = ? WHERE id = ?",
            [name, email, id]
        );
    }

    async deleteUser(id: number): Promise<void> {
        await this.pool.query("DELETE FROM users WHERE id = ?", [id]);
    }
}

// HTTP Server Class
class HTTPServer {
    private server: http.Server;
    private dbService: DatabaseService;

    constructor() {
        this.dbService = new DatabaseService();
        this.server = http.createServer(
            (req: http.IncomingMessage, res: http.ServerResponse) =>
                this.handleRequest(req, res)
        );
    }

    private sendJSON(
        res: http.ServerResponse,
        statusCode: number,
        data: ResponseData
    ): void {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
    }

    private async parseBody(req: http.IncomingMessage): Promise<any> {
        return new Promise((resolve, reject) => {
            let body = "";
            req.on("data", (chunk: string) => (body += chunk));
            req.on("end", () => {
                try {
                    resolve(body ? JSON.parse(body) : {});
                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    private async handleRequest(
        req: http.IncomingMessage,
        res: http.ServerResponse
    ): Promise<void> {
        const parsedUrl = url.parse(req.url!, true);
        const { pathname } = parsedUrl;

        // CORS headers (optional)
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        // Handle preflight request
        if (req.method === "OPTIONS") {
            res.writeHead(200);
            res.end();
            return;
        }

        try {
            if (pathname === "/users" && req.method === "POST") {
                await this.handleCreateUser(req, res);
            } else if (pathname === "/users" && req.method === "GET") {
                await this.handleGetAllUsers(res);
            } else if (
                pathname!.startsWith("/users/") &&
                req.method === "GET"
            ) {
                await this.handleGetUser(req, res);
            } else if (
                pathname!.startsWith("/users/") &&
                req.method === "PUT"
            ) {
                await this.handleUpdateUser(req, res);
            } else if (
                pathname!.startsWith("/users/") &&
                req.method === "DELETE"
            ) {
                await this.handleDeleteUser(req, res);
            } else {
                this.sendJSON(res, 404, { error: "Route not found" });
            }
        } catch (error) {
            this.sendJSON(res, 500, { error: (error as Error).message });
        }
    }

    private async handleCreateUser(
        req: http.IncomingMessage,
        res: http.ServerResponse
    ): Promise<void> {
        const body = await this.parseBody(req);

        if (!body.name || !body.email) {
            this.sendJSON(res, 400, { error: "name and email are required" });
            return;
        }

        const insertId = await this.dbService.createUser(body.name, body.email);
        const user = await this.dbService.getUserById(insertId);

        this.sendJSON(res, 201, user!);
    }

    private async handleGetAllUsers(res: http.ServerResponse): Promise<void> {
        const users = await this.dbService.getAllUsers();
        this.sendJSON(res, 200, users);
    }

    private async handleGetUser(
        req: http.IncomingMessage,
        res: http.ServerResponse
    ): Promise<void> {
        const id = this.extractUserId(req.url!);
        if (!id) {
            this.sendJSON(res, 400, { error: "Invalid user ID" });
            return;
        }

        const user = await this.dbService.getUserById(id);
        if (!user) {
            this.sendJSON(res, 404, { error: "User not found" });
            return;
        }

        this.sendJSON(res, 200, user);
    }

    private async handleUpdateUser(
        req: http.IncomingMessage,
        res: http.ServerResponse
    ): Promise<void> {
        const id = this.extractUserId(req.url!);
        if (!id) {
            this.sendJSON(res, 400, { error: "Invalid user ID" });
            return;
        }

        const existingUser = await this.dbService.getUserById(id);
        if (!existingUser) {
            this.sendJSON(res, 404, { error: "User not found" });
            return;
        }

        const body = await this.parseBody(req);
        const updatedName = body.name || existingUser.name;
        const updatedEmail = body.email || existingUser.email;

        await this.dbService.updateUser(id, updatedName, updatedEmail);
        const updatedUser = await this.dbService.getUserById(id);

        this.sendJSON(res, 200, updatedUser!);
    }

    private async handleDeleteUser(
        req: http.IncomingMessage,
        res: http.ServerResponse
    ): Promise<void> {
        const id = this.extractUserId(req.url!);
        if (!id) {
            this.sendJSON(res, 400, { error: "Invalid user ID" });
            return;
        }

        const existingUser = await this.dbService.getUserById(id);
        if (!existingUser) {
            this.sendJSON(res, 404, { error: "User not found" });
            return;
        }

        await this.dbService.deleteUser(id);
        this.sendJSON(res, 200, { message: "User deleted successfully" });
    }

    private extractUserId(urlString: string): number | null {
        const pathname = url.parse(urlString).pathname;
        const id = parseInt(pathname!.split("/")[2]);
        return isNaN(id) ? null : id;
    }

    public start(port: number): void {
        this.server.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    }
}

// Application Entry Point
class AppServer {
    private httpServer: HTTPServer;

    constructor() {
        this.httpServer = new HTTPServer();
    }

    public start(): void {
        const PORT = 5000;
        this.httpServer.start(PORT);
    }
}

// Start the application
const server = new AppServer();
server.start();
