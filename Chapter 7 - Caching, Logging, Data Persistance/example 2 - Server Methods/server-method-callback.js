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


// Server method with a bound context
server.method('boundGetHello', function (next) {

    return next(`bound ${this.user}`);
}, { bind: { user: 'john' } });

server.methods.boundGetHello((res) => {

    console.log(res);
});