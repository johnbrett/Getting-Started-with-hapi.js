'use strict';

const Hapi = require('hapi');
const Cookie = require('hapi-auth-cookie');
const Blipp = require('blipp');
const routes = require('./routes');

const server = new Hapi.Server();
server.connection({ host: '127.0.0.1', port: 1337 });

server.register([
    Cookie,
    { register: Blipp, options: { showAuth: true } }
], (err) => {

    // handle err logic

    server.auth.strategy(
        'session',
        'cookie',
        {
            cookie: 'example',
            password: 'password',
            isSecure: false,
            redirectTo: '/login',
            redirectOnTry: false
        }
    );
    server.auth.default('session');

    server.route(routes);

    server.start((err) => {

        console.log(`Server running at ${server.info.uri}`);
    });
});
