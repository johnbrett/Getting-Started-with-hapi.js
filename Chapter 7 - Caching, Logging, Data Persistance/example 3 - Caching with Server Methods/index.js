'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({ port: 1337, host: '127.0.0.1' });

const internals = {};

internals.getHello = function (name, next) {

    console.log(`server hit for ${name}`);
    setTimeout(() => {

        return next(null, `hello ${name} on ${new Date()}`);
    }, 500);
};

server.method('getHello', internals.getHello, {
    cache: {
        expiresIn: 60 * 1000,
        generateTimeout: 1000
    }
});

const getHello = function (name, callback) {

    server.methods.getHello(name, callback);
};

server.route({
    path: '/hello/{name}',
    method: 'GET',
    handler: function (request, reply) {

        const name = request.params.name;
        console.log(`request received for: ${name} `);
        return getHello(name, reply);
    }
});

server.start((err) => {

    console.log(`Server running at ${server.info.uri}`);
});
