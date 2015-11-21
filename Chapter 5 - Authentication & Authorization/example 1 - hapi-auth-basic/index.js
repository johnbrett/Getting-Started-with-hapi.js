'use strict';

const Hapi = require('hapi');
const Basic = require('hapi-auth-basic');
const Blipp = require('blipp');
const routes = require('./routes');

const server = new Hapi.Server();
server.connection({ host: '127.0.0.1', port: 1337 });

server.register([
    Basic,
    { register: Blipp, options: { showAuth: true } }
], (ignore) => {

    const basicConfig = {
        validateFunc: function (request, username, password, callback) {

            if (username !== 'admin' || password !== 'password') {
                return callback(null, false);
            }

            return callback(null, true, { username: 'admin' });
        }
    };

    server.auth.strategy('simple', 'basic', basicConfig);
    server.auth.default('simple');

    server.route(routes);

    server.start((err) => {

        console.log(`Server running at ${server.info.uri}`);
    });
});
