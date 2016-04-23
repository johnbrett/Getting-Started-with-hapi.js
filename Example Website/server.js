'use strict';

const Hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');

const server = new Hapi.Server();
server.connection({ port: 8000 });

server.register([Inert, Vision], (err) => {

    if (err) {
        throw err;
    }

    server.views({
        engines: { html: require('handlebars') },
        path: __dirname + '/website/templates',
        layout: 'index'
    });

    server.route([
        {
            method: 'GET', path: '/{p*}', handler: (request, reply) => {

                reply.view((request.params.p || 'summary') + '.html');
            }
        },
        { method: 'GET', path: '/css/{p*}', handler: { directory: { path: './website/css' } } },
        { method: 'GET', path: '/img/{p*}', handler: { directory: { path: './website/img' } } }
    ]);

    server.start((err) => {

        if (err) {
            throw err;
        }

        console.log(`Server running at ${server.info.uri}`);
    });
});
