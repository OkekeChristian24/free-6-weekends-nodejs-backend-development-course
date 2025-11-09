import http, { IncomingMessage, ServerResponse } from "http";

const server = http.createServer(
    (req: IncomingMessage, res: ServerResponse) => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello from Node server!");
    }
);

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
