'use strict';

const Boom = require('boom');

module.exports = [
    {
        method: 'GET',
        path: '/public',
        config: {
            auth: {
                mode: 'try'
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
            handler: function (request, reply) {

                return reply(request.auth);
            }
        }
    },
    {
        method: 'GET',
        path: '/login',
        config: {
            auth: false,
            handler: function (request, reply) {

                let loginForm = `
                    <form method="post" action="/login">
                        Username: <input type="text" name="username" />
                        <br>
                        Password: <input type="password" name="password" />
                        <br>
                        <input type="submit" value="Login" />
                    </form>
                `;

                if (request.query.login === 'failed') {
                    loginForm += `<h3>Previous login attempt failed</h3>`;
                }

                return reply(loginForm);
            }
        }
    },
    {
        method: 'POST',
        path: '/login',
        config: {
            auth: {
                mode: 'try'
            },
            handler: function (request, reply) {

                if (request.payload.username !== 'admin' || request.payload.password !== 'password') {
                    return reply.redirect('/login?login=failed');
                }

                request.auth.session.set({ username: request.payload.username });
                return reply.redirect('/private');
            }
        }
    }
];
