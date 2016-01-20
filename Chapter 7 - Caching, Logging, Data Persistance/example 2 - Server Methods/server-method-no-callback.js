'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

// Create server method
server.method('getHello', (name) => {

    return `hello ${name}`;
}, { callback: false });

// Call server method
const message = server.methods.getHello('world');
console.log(message);
