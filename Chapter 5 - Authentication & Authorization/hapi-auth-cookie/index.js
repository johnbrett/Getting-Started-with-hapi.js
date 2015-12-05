'use strict';
const Hapi = require('hapi');
const Cookie = require('hapi-auth-cookie');
const Blipp = require('blipp');
const routes = require('./routes');

const server = new Hapi.Server();
server.connection({ port: 1337 });

server.register([
    Cookie,
    { register: Blipp, options: { showAuth: true } }
], (ignore) => {

    server.auth.strategy(
        'session',
        'cookie',
        {
            cookie: 'example',
            password: 'secret',
            isSecure: false,
            redirectTo: '/login',
            redirectOnTry: false,
            appendNext: 'redirect'
        }
    );
    server.auth.default('session');

    server.route(routes);

    server.start((err) => {

        console.log(`Server running at: ${server.info.uri}`);
    });
});
