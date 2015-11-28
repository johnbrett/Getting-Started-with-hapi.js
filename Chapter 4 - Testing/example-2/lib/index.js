'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection();

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        return reply('Hello World\n');
    }
});

module.exports = server;
