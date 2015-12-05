'use strict';

const Hapi = require('hapi');
const Joi = require('joi');

const server = new Hapi.Server();

server.connection({ port: 1337, host: '127.0.0.1' });

server.route({
    method: 'GET',
    path: '/hello/{name}',
    config: {
        description: 'Return an object with a message of hello to the name provided',
        validate: {
            params: {
                name: Joi.string().min(3).required()
            }
        },
        pre: [],
        handler: function (request, reply) {

            const name = request.params.name;
            return reply({ message: `Hello ${name}` });
        },
        cache: {
            expiresIn: 3600000
        }
    }
});

server.start((err) => {

    console.log(`Server running at ${server.info.uri}`);
});
