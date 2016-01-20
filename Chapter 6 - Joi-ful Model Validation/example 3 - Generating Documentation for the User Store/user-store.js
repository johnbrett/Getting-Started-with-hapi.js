'use strict';

const Uuid = require('uuid');
const Boom = require('boom');
const Joi = require('joi');

const usernameSchema = Joi.string().min(4).max(40);
const userSchema = Joi.object().keys({
    username: usernameSchema.required(),
    email: Joi.string().email(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    meta: Joi.object()
}).xor('username', 'email');

exports.register = function (server, options, next) {

    let store;
    server.dependency('hapi-level', (depServer, after) => {

        store = depServer.plugins['hapi-level'].db.sublevel('user');
        return after();
    });

    const getUser = function (userId, callback) {

        return store.get(userId, callback);
    };

    const createUser = function (userDetails, callback) {

        const userId = Uuid.v4();
        const user = {
            id: userId,
            details: userDetails
        };

        store.put(userId, user, (err) => {

            getUser(userId, callback);
        });
    };

    server.route([
        {
            method: 'GET',
            path: '/user/{userId}',
            config: {
                validate: {
                    params: {
                        userId: usernameSchema.required()
                    },
                    query: false
                },
                handler: function (request, reply) {

                    const userId = request.params.userId;
                    getUser(userId, (err, user) => {

                        if (err) {
                            return reply(Boom.notFound(err));
                        }

                        user.test = 'test';
                        return reply(user);
                    });
                },
                response: {
                    schema: Joi.object().keys({
                        id: Joi.string().min(4).max(40),
                        details: Joi.object()
                    }),
                    failAction: 'error',
                    options: {
                        stripUnknown: true
                    },
                    modify: true
                },
                description: 'Retrieve a user',
                tags: ['api']
            }
        },
        {
            method: 'POST',
            path: '/user',
            config: {
                validate: {
                    params: false,
                    query: false,
                    payload: userSchema
                },
                handler: function (request, reply) {

                    const userDetails = request.payload;
                    createUser(userDetails, (err, user) => {

                        if (err) {
                            return reply(Boom.badRequest(err));
                        }

                        return reply(user);
                    });
                },
                description: 'Create a user',
                tags: ['api']
            }
        }
    ]);

    server.expose({
        getUser: getUser,
        createUser: createUser
    });

    return next();
};

exports.register.attributes = {
    name: 'user-store'
};
