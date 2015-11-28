'use strict';

const Hapi = require('hapi');
const Basic = require('hapi-auth-basic');

const server = new Hapi.Server();
server.connection({ port: 1337 });

server.register([
    Basic
], (ignore) => {

    const basicConfig = {
        validateFunc: function (request, username, password, callback) {

            if (username !== 'admin' || password !== 'password') {
                return callback(null, false);
            }

            return callback(null, true, { username: 'admin' });
        }
    };

    server.auth.strategy('simple', 'basic', 'required', basicConfig);

    server.route([
        {
            method: 'GET',
            path: '/public',
            config: {
                auth: false,
                handler: function (request, reply) {

                    return reply(request.auth);
                }
            }
        },
        {
            method: 'GET',
            path: '/private',
            config: {
                handler: function (request, reply) {

                    return reply(request.auth);
                }
            }
        }
    ]);

    server.start((err) => console.log(`Server running at: ${server.info.uri}`));
});
