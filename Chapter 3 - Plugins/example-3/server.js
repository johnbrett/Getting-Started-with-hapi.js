'use strict';

const Hapi = require('hapi');
const Blipp = require('blipp');
const HapiLevel = require('hapi-level');
const UserStore = require('./UserStore.js');

const server = new Hapi.Server();

server.connection({ port: 1337, host: '127.0.0.1' });

server.register([
	{ register: HapiLevel, options: { path: './temp', config: { valueEncoding: 'json'	}}},
	UserStore,
	Blipp
], (err) => {

	server.start((err) => {

		console.log(`Server running at ${server.info.uri}`);
	});
});
