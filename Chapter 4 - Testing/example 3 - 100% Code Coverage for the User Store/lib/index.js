'use strict';

const Hapi = require('hapi');
const Blipp = require('blipp');
const HapiLevel = require('hapi-level');
const Hoek = require('hoek');
const UserStore = require('./user-store.js');

const internals = {
    config: {
        isTest: false,
        port: 1337,
        path: './.temp'
    }
};

exports.init = function (config, next) {

    const options = Hoek.applyToDefaults(internals.config, config);

    const server = new Hapi.Server();

    server.connection({ port: options.port, host: '127.0.0.1' });

    server.register([
        { register: HapiLevel, options: {
            path: options.path,
            config: { valueEncoding: 'json' } }
        },
        UserStore,
        { register: Blipp, options: { showStart: !options.isTest } }
    ], (err) => {

        if (err) {
            return next(err);
        }

        server.start((err) => {

            return next(err, server);
        });
    });
};
