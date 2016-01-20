'use strict';

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
    let ObjectID;
    server.dependency('hapi-mongodb', (depServer, after) => {

        store = depServer.plugins['hapi-mongodb'].db.collection('users');
        ObjectID = depServer.plugins['hapi-mongodb'].ObjectID;
        return after();
    });

    const getUser = function (userId, callback) {

        console.log('retrieving from database ... ', userId);
        store.findOne({ '_id' : ObjectID(userId) }, (err, result) => {

            if (!result) {
                return callback(Boom.notFound());
            }

            result.id = result._id;
            delete result._id;
            return callback(null, result);
        });
    };
    server.method('getUser', getUser, {
        cache: {
            expiresIn: 30 * 1000,
            generateTimeout: 1000
        }
    });

    const createUser = function (userDetails, callback) {

        const userId = new ObjectID();
        const user = {
            _id: userId,
            details: userDetails
        };

        store.insertOne(user, (err, result) => {

            if (err) {
                callback(Boom.internal(err));
            }
            getUser(userId.toString(), callback);
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
                    server.methods.getUser(userId, (err, user) => {

                        console.log('get user called ... ', err, user);
                        if (!user) {
                            return reply(Boom.notFound());
                        }

                        return reply(user);
                    });
                },
                description: 'Retrieve a user',
                tags: ['api']
            }
        },
        {
            method: 'PUT',
            path: '/user/{userId}',
            config: {
                validate: {
                    params: {
                        userId: usernameSchema.required()
                    }
                },
                handler: function (request, reply) {

                    // Remove user from cache
                    const userId = request.params.userId;
                    server.methods.getUser.cache.drop(userId, () => {

                        console.log('user removed from cache ... ');
                        return reply({ message: 'removed from cache' });
                    });
                },
                description: 'Remove cache for a user',
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
