'use strict';

const Hapi = require('hapi');
const Cookie = require('hapi-auth-cookie');
const Bell = require('bell');
const Blipp = require('blipp');

const routes = require('./routes');

const server = new Hapi.Server();
server.connection({ host: '127.0.0.1', port: 1337 });

server.register([
    Cookie,
    Bell,
    { register: Blipp, options: { showAuth: true } }
], (err) => {

    // handle err logic

    // Acquire the clientId and clientSecret by creating a
    // twitter application at https://apps.twitter.com/app/new
    server.auth.strategy(
        'twitter',
        'bell',
        {
            provider: 'twitter',
            password: 'cookie_encryption_password',
            clientId: '',
            clientSecret: '', 
            isSecure: false
        }
    );

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

    server.route(routes);

    server.start((err) => {

        console.log(`Server running at ${server.info.uri}`);
    });
});
