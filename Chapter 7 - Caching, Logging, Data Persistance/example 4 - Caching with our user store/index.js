'use strict';

const Hapi = require('hapi');
const Blipp = require('blipp');
const HapiMongo = require('hapi-mongodb');
const UserStore = require('./user-store.js');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');

const server = new Hapi.Server();

server.connection({ port: 1337, host: '127.0.0.1' });

server.register([
    { register: HapiMongo, options: { url: 'mongodb://localhost:27017/user-store' } },
    UserStore,
    Blipp,
    Inert,
    Vision,
    HapiSwagger
], (err) => {

    if (err) {
        throw err;
    }

    server.start((err) => {

        if (err) {
            throw err;
        }

        console.log(`Server running at ${server.info.uri}`);
    });
});
