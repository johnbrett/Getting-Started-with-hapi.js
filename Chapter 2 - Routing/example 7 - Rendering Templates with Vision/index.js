'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Vision = require('vision');

const server = new Hapi.Server();
server.connection({ port: 1337 });

server.register(Vision, (err) => {

    server.views({
        engines: {
            html: {
					module: require('handlebars')
			  }
        },
        relativeTo: __dirname,
        path: 'templates'
    });

	 server.route({
	 	method: 'GET',
		path: '/index',
		handler: function (request, reply) {

			let context = { title: 'Hapi Templates!' };
			return reply.view('index', context);
		}
	 });

	 server.start((err) => {

      	console.log(`Server running at: ${server.info.uri}`);
  	 });
});
