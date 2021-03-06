'use strict';

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

module.exports = manifest;
