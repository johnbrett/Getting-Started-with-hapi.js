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

    server.auth.strategy(
        'twitter',
        'bell',
        {
            provider: 'twitter',
            password: 'cookie_encryption_password',
            clientId: 'artnBIV7G3atQ8vfnQzTLJNU8',
            clientSecret: '4vi3akf80xc9twXx5STSOUsX46GhYpCRv3hO5N278bBMgjO6Hq',
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

    server.start(() => {});
});
