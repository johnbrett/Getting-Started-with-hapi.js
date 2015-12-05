'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({ port: 1337, host: '127.0.0.1' });

const hello = function (name) {

    return this.response({ hello: name });
};

server.decorate('reply', 'hello', hello);

server.route({
    method: 'GET',
    path: '/{name*}',
    handler: function (request, reply) {

        return reply.hello(request.params.name);
    }
});

server.start((err) => {

    console.log(`Server running at ${server.info.uri}`);
});
