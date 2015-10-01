'use strict';

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/hello',
        handler: function (request, reply) {

            return reply('Hello World\n');
        }
    });

    next();
};

exports.register.attributes = {
    name: 'hello'
};
