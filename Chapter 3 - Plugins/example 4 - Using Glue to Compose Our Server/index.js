'use strict';

const Glue = require('glue');

const manifest = {
    server: {},
    connections: [
        { port: 1337, host: '127.0.0.1' }
    ],
    plugins: [
        { 'hapi-level': { path: './temp', config: { valueEncoding: 'json' } } },
        { './user-store.js': {} },
        { 'blipp': {} }
    ]
};

Glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {

    server.start((err) => {

        console.log(`Server running at ${server.info.uri}`);
    });
});