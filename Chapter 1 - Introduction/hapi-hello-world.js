const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({ port: 1337, host: '127.0.0.1' });

server.route({
	method: 'GET',
	path: '/',
	handler: function (request, reply) {

		return reply('Hello World\n');
	}
});

server.start((err) => {

	console.log(`Server running at ${server.info.uri}`);
});
