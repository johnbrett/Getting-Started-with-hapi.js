'use strict';

/*
* This example demonstrates usage of route prerequisites
*
* Set timeouts are used to mimic delays & demonstate actions happening in parallel
* As getUserDetails & getUserConnections are done in parallel,
* request takes ~1.5 seconds instead of ~2 seconds
*/

const Hapi = require('hapi');
const Joi = require('joi');
const Boom = require('boom');

const server = new Hapi.Server();

const userDB = {
    john: { id: 1, meta: 'test' }
};

const connectionDB = {
    john: ['tim', 'bob']
};

const setupDBConnections = function (request, reply) {

    request.userDB = userDB;
    request.connectionDB = connectionDB;

    setTimeout(reply, 500);
};

const checkUserExists = function (request, reply) {

    if (!request.userDB[request.params.name]) {
        return reply(Boom.notFound());
    }

    setTimeout(reply, 500);
};

const getUserDetails = function (request, reply) {

    setTimeout(() => {

        return reply(request.userDB[request.params.name]);
    }, 500);
};

const getUserConnections = function (request, reply) {

    setTimeout(() => {

        return reply(request.connectionDB[request.params.name]);
    }, 500);
};

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
        pre: [
            { method: setupDBConnections },                                 // series
            { method: checkUserExists },                                    // series
            [
                { method: getUserDetails, assign: 'userDetails' },          // parallel
                { method: getUserConnections, assign: 'userConnections' }   // parallel
            ]
        ],
        handler: function (request, reply) {

            const user = request.pre.userDetails;
            user.connections = request.pre.userConnections;

            // Calculate request length
            const time = (new Date().getTime() - request.info.received) / 1000;
            console.log(`Request time taken: ${time}`);

            return reply(user);
        }
    }
});

server.start((err) => {

    console.log(`Server running at ${server.info.uri}`);
});
