'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({ port: 1337, host: '127.0.0.1' });

server.handler('hello', (route, options) => {

    return function (request, reply) {

        const hello = options.customHello || 'Hello';
        const name = request.params.name;
        return reply(`${hello} ${name}`);
    };
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: {
        hello: {
            customHello: 'Welcome'
        }
    }
});

server.start((err) => {

    console.log(`Server running at ${server.info.uri}`);
});
