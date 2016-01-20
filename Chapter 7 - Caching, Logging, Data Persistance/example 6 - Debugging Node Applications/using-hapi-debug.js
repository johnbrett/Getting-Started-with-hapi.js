'use strict';

const Hapi = require('hapi');
const Good = require('good');

const server = new Hapi.Server({ debug: { log: ['error'] } });
server.connection({ port: 1337, host: '127.0.0.1' });

server.route([
	{
		path: '/error',
		method: 'GET',
		handler: function (request, reply) {

			throw new Error();
		}
	}
]);

server.start((err) => {

	console.log(`Server running at ${server.info.uri}`);
});
