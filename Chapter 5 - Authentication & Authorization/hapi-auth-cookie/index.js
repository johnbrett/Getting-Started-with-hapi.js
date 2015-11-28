'use strict';
const Hapi = require('hapi');
const Cookie = require('hapi-auth-cookie');

const server = new Hapi.Server();
server.connection({ port: 1337 });

server.register([
    Cookie
], (ignore) => {

    server.auth.strategy(
        'session',
        'cookie',
        {
            cookie: 'example',
            password: 'secret',
            isSecure: false,
            redirectTo: '/login',
            redirectOnTry: false,
            appendNext: 'redirect'
        }
    );

    server.route([
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
                auth: {
                    mode: 'required',
                    strategy: 'session'
                },
                handler: function (request, reply) {

                    return reply(request.auth);
                }
            }
        }
    ]);

    server.route({
      method: 'GET',
      path: '/login',
      config: {
        auth: {
          mode: 'try',
          strategy: 'session',
        }
      },
      handler: function(request, reply) {
        var redirectPath = request.query.redirect || '/';
        var context = {
          session: {},
        };
  
        if (request.auth.isAuthenticated) {
          return reply.redirect(redirectPath);
        }
  
        reply.view('login', context);
      }
    });
  
    // Register a route to process the login credentials.
    // If the credentials are valid, create a session and redirect the client to another page.
    // If the credentials are invalid, show the login page and an error message.
    server.route({
      method: 'POST',
      path: '/login',
      config: {
        auth: {
          mode: 'try',
          strategy: 'session',
        }
      },
      handler: function(request, reply) {
        var redirectPath = request.query.redirect || '/';
        var context = {
          session: {},
        };
  
        if (request.auth.isAuthenticated) {
          return reply.redirect(redirectPath);
        }
  
        if (request.payload.username === 'admin' && request.payload.password === 'password') {
          request.auth.session.set({ username: request.payload.username });
          return reply.redirect(redirectPath);
        }
  
        context.err = 'Invalid Credentials';
        reply.view('login', context);
      }
    });

    server.start((err) => console.log(`Server running at: ${server.info.uri}`));
});
