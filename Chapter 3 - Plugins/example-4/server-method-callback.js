'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

// Create a server method
server.method('getHello', (name, next) => {

    return next(`hello ${name}`);
});

// Call server method
server.methods.getHello('world', (res) => {

    console.log(res);
});
