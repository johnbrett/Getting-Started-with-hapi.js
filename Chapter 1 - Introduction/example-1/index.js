'use strict';

const http = require('http');                                           // [1]

const hostname = '127.0.0.1';
const port = 1337;

http.createServer((req, res) => {                                       // [2]
    res.writeHead(200, { 'Content-Type': 'text/plain' });               // [3]
    res.end('Hello World\n');                                           // [4]
}).listen(port, hostname, () => {                                       // [5]
    console.log(`Server running at http://${hostname}:${port}/`);
});