'use strict';

const Hapi = require('hapi');
const Good = require('good');

const server = new Hapi.Server();
server.connection({ port: 1337, host: '127.0.0.1' });

server.route([
	{
		path: '/',
		method: 'GET',
		handler: function (request, reply) {

			return reply({ message: 'test' });
		}
	},
	{
		path: '/error',
		method: 'GET',
		handler: function (request, reply) {

			throw new Error();
		}
	}
]);

const goodOptions = {
	opsInterval: 3000,
	reporters: [
		{
			reporter: require('good-console'),
			events: { ops: '*', log: '*', response: '*', error: '*' }
		}
	]	
};

server.register({ register: Good, options: goodOptions }, (err) => {
	
	if (err) {
		throw err;
	}
	
	server.start((err) => {
	
		console.log(`Server running at ${server.info.uri}`);
	});
});

