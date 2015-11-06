'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({ port: 1337, host: '127.0.0.1' });

server.method('getHello', function (name, next) {

	return next(`hello ${name}`);
});

server.methods.getHello('world', function (res) => {

	console.log(res)
});

server.start((err) => {

	console.log(`Server running at ${server.info.uri}`);
});
