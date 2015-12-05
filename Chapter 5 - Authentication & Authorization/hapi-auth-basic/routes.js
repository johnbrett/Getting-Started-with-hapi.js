'use strict';

module.exports = [
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
];
