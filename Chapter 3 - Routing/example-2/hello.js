'use strict';

exports.register = function (server, options, next) {

	let hello = function(_name) {

		let name = _name || 'World';
		return `Hello ${name}`;
	}

	server.expose({hello: hello});

	server.route({
		method: 'GET',
		path: '/hello/{name}',
		handler: (request, reply) => {
			
			let message = hello(request.params.name);
			return reply(message);
		}
	});

  return next();
};

exports.register.attributes = {
    name: 'hello'
};
