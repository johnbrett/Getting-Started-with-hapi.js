'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server();
server.connection({ port: 1337 });

server.register(Inert, (err) => {

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: Path.join(__dirname, 'public')
            }
        }
    });

    server.start((err) => {

        console.log(`Server running at: ${server.info.uri}`);
    });
});
