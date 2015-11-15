'use strict';

let Hapi = require('hapi');
let Blipp = require('blipp');
let Hello = require('./hello');

let server = new Hapi.Server();

server.connection({ port: 1337, host: '127.0.0.1' });

server.register([
	{ register: Hello, options: {} },
	Blipp
], function(err){

	server.start((err) => {

		console.log(`Server running at ${server.info.uri}`);
	});
});
