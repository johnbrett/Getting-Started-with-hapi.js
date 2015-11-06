const http = require('http');						// [1]

http.createServer((request, response) => {		// [2]
  response.writeHead(200, {'Content-Type': 'text/plain'});	// [3]
  response.end('Hello World\n');					// [4]
}).listen(1337, '127.0.0.1');						// [5]

console.log('Server running at http://127.0.0.1:1337/');
