'use strict';

const server = require('./server');

server.init({ port: 1337, path: './.data' }, (err, server) => {

    if (err) {
        throw err;
    }

    console.log(`Server started at: ${server.info.uri}`);
});