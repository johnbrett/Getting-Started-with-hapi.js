'use strict';

const Uuid = require('uuid');
const Boom = require('boom');

const internals = {
    store: null
};

internals.getUser = (userId, callback) => {

    return internals.store.get(userId, callback);
};

internals.createUser = (userDetails, callback) => {

    const userId = Uuid.v4();
    const user = {
        id: userId,
        details: userDetails
    };

    internals.store.put(userId, user, (err) => {

        internals.getUser(userId, callback);
    });
};

exports._internals = internals;

exports.register = function (server, options, next) {

    server.dependency('hapi-level', (_server, after) => {

        internals.store = _server.plugins['hapi-level'].db.sublevel('user');
        return after();
    });

    server.route([
        {
            method: 'GET',
            path: '/user/{userId}',
            config: {
                handler: function (request, reply) {

                    const userId = request.params.userId;
                    internals.getUser(userId, (err, user) => {

                        if (err) {
                            return reply(Boom.notFound(err));
                        }

                        return reply(user);
                    });
                },
                description: 'Retrieve a user'
            }
        },
        {
            method: 'POST',
            path: '/user',
            config: {
                handler: function (request, reply) {

                    const userDetails = request.payload;
                    server.plugins.UserStore.createUser(userDetails, (err, user) => {

                        if (err) {
                            return reply(Boom.badRequest(err));
                        }

                        return reply(user);
                    });
                },
                description: 'Create a user'
            }
        }
    ]);

    server.expose({
        getUser: internals.getUser,
        createUser: internals.createUser
    });

    return next();
};

exports.register.attributes = {
    name: 'UserStore'
};
