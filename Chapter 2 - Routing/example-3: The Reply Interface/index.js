'use strict';

const Hapi = require('hapi');
const Blipp = require('blipp');
const Stream = require('stream');

const server = new Hapi.Server();

server.connection({ port: 1337, host: '127.0.0.1' });

server.register(Blipp, (err) => {

    server.route([
        {
            method: 'GET',
            path: '/null',
            handler: function (request, reply) {

                return reply(null);
            }
        },
        {
            method: 'GET',
            path: '/undefined',
            handler: function (request, reply) {

                return reply(undefined);
            }
        },
        {
            method: 'GET',
            path: '/string',
            handler: function (request, reply) {

                return reply('string');
            }
        },
        {
            method: 'GET',
            path: '/number',
            handler: function (request, reply) {

                return reply(42);
            }
        },
        {
            method: 'GET',
            path: '/boolean',
            handler: function (request, reply) {

                return reply(true);
            }
        },
        {
            method: 'GET',
            path: '/buffer',
            handler: function (request, reply) {

                const buffer = new Buffer('This is a string in a buffer!', 'utf-8');
                return reply(buffer);
            }
        },
        {
            method: 'GET',
            path: '/error',
            handler: function (request, reply) {

                return reply(new Error('this is an error'));
            }
        },
        {
            method: 'GET',
            path: '/stream',
            handler: function (request, reply) {

                const stream = new Stream.Readable();
                stream.push('first chunk ');
                stream.push('second chunk');
                stream.push(null); // We are done pushing data
                return reply(stream);
            }
        },
        {
            method: 'GET',
            path: '/promise',
            handler: function (request, reply) {

                const promise = new Promise((resolve, reject) => {

                    return resolve({ firstAction: 'Do an intial action' });
                });
                promise.then((response) => {

                    response.secondAction = 'A second action was performed';
                    return response;
                });
                return reply(promise);
            }
        },
        {
            method: 'GET',
            path: '/object',
            handler: function (request, reply) {

                return reply({ 'description': 'this is a sample object being returned' });
            }
        },
        {
            method: 'GET',
            path: '/array',
            handler: function (request, reply) {

                return reply([1, 2, 'test', { 'sample': 'object' }]);
            }
        },
        {
            method: '*',
            path: '/{p*}',
            handler: function (request, reply) {

                return reply('The page was not found').code(404);
            }
        }
    ]);

    server.start((err) => {

        console.log(`Server running at ${server.info.uri}`);
    });
});
