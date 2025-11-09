const http = require("http");

const requestHandler = (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });

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
                message: "About this server: built using Node.js and classes",
            })
        );
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Route not found" }));
    }
};

const server = http.createServer(requestHandler);

server.listen(3000, () => {
    console.log("Server running on http://localhost:5000");
});
