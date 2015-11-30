'use strict';

// Load modules

const Hapi = require('hapi');

// Declare internals

const internals = {};

internals.init = () => {

    const server = new Hapi.Server();
    server.connection({ port: 1337, host: '127.0.0.1' });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            return reply('Hello World\n');
        }
    });

    server.start(() => {

        console.log(`Server running at ${server.info.uri}`);
    });
};

internals.init();
