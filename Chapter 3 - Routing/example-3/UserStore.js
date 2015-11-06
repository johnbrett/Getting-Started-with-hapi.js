'use strict';

const Uuid = require('uuid');
const Boom = require('boom');

exports.register = function (server, options, next) {

  let store;
	server.dependency('hapi-level', (server, after) => {

		store = server.plugins['hapi-level'].db.sublevel('user');
		return after();
	});

	const getUser = (userId, callback) => {

     return store.get(userId, callback);
	};

	const createUser = (userDetails, callback) => {

    const userId = Uuid.v4();
    const user = {
      id: userId,
      details: userDetails
    };
    store.put(userId, user, (err) => {

      getUser(userId, callback)
    });
	};

	server.route([
		{
			method: 'GET',
			path: '/user/{userId}',
			config: {
				handler: function (request, reply) {

					const userId = request.params.userId;
					getUser(userId, (err, user) => {
						if(err) {
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
					createUser(userDetails, (err, user) => {
						if(err) {
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
		getUser: getUser,
		createUser: createUser
	});

	return next();
};

exports.register.attributes = {
    name: 'UserStore'
};
