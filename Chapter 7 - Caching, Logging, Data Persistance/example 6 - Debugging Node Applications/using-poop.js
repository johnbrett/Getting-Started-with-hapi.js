'use strict';

const Hapi = require('hapi');
const Poop = require('poop');
const server = new Hapi.Server();

server.register(Poop, (err) => {

    throw new Error('uncaught');
});