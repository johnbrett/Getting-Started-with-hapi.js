'use strict';

module.exports = [
    {
        method: 'GET',
        path: '/login',
        config: {
            auth: 'twitter',
            handler: function (request, reply) {

                if (!request.auth.isAuthenticated) {
                    request.auth.session.clear();
                    return reply('Login failed...');
                }

                request.cookieAuth.set({
                    username: request.auth.credentials.profile.username
                });
                return reply.redirect('/private');
            }
        }
    },
    {
        method: 'GET',
        path: '/public',
        config: {
            auth: {
                mode: 'try',
                strategy: 'session'
            },
            handler: function (request, reply) {

                return reply(request.auth);
            }
        }
    },
    {
        method: 'GET',
        path: '/private',
        config: {
            auth: 'session',
            handler: function (request, reply) {

                return reply(request.auth);
            }
        }
    }
];