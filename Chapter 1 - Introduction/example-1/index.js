// 'use strict';

// const http = require('http');						                       // [1]

// http.createServer(function (request, response) {		                   // [2]

//     response.writeHead(200, { 'Content-Type': 'text/plain' });             // [3]
//     response.end('Hello World\n');					                       // [4]
// }).listen(1337, '127.0.0.1');						                       // [5]

// console.log('Server running at http://127.0.0.1:1337/');

const http = require('http');

const hostname = '127.0.0.1';
const port = 1337;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});