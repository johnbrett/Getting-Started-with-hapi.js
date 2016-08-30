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
        { method: 'GET', path: '/{p*}', handler: (request, reply) => {

            const context = {
                pageTitle: 'Learn hapi.js | Getting Started with hapi.js',
                title: 'Getting Started with hapi.js',
                smallDescription: 'Getting Started with hapi.js, a book to teach you how to build well-structured, testable applications and APIs using hapi.js',
                subheading: 'Learn to build well-structured, testable applications and APIs using hapi.js'
            };
            return reply.view(`${(request.params.p || 'summary')}.html`, context);
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
