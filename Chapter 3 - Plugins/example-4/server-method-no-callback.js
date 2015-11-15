'use strict';
let Hapi = require('hapi');

let server = new Hapi.Server();

server.connection({ port: 1337, host: '127.0.0.1' });

server.method('getHello', function(name) {

	return `hello ${name}`;
}, { callback: false});

let message = server.methods.getHello('world');
console.log(message)

server.start((err) => {

	console.log(`Server running at ${server.info.uri}`);
});
