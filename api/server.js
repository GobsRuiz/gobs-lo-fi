const index = require("./index");
const http = require("http");
const port = 3120;
const server = http.createServer(index);

server.listen(port);