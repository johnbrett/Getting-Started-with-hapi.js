'use strict';

const Hapi = require('hapi');
const Blipp = require('blipp');
const Basic = require('hapi-auth-basic');

const server = new Hapi.Server();
server.connection({ host: '127.0.0.1', port: 1337 });

server.register([
    Basic,
    Blipp
], (err) => {

    // handle err logic

    const basicConfig = {
        validateFunc: function (request, username, password, callback) {

            if (username === 'admin1' && password === 'password') {
                return callback(null, true, { user: 'admin1', scope: 'admin' });
            }

            if (username === 'user2' && password === 'password') {
                return callback(null, true, { user: 'user2', scope: 'user' });
            }

            return callback(null, false);
        }
    };

    server.auth.strategy('simple', 'basic', basicConfig);
    server.auth.default('simple');

    server.route([
        {
            method: 'GET',
            path: '/admin',
            config: {
                auth: {
                    access: {
                        scope: ['admin', 'something']
                    }
                },
                handler: function (request, reply) {

                    return reply(request.auth);
                }
            }
        },
        {
            method: 'GET',
            path: '/any',
            config: {
                handler: function (request, reply) {

                    return reply(request.auth);
                }
            }
        }
    ]);

    server.start((err) => {

        console.log(`Server running at ${server.info.uri}`);
    });
});
