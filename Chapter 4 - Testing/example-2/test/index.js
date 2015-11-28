'use strict';

const Code = require('code');
const Lab = require('lab');
const server = require('../lib/index.js');

const lab = exports.lab = Lab.script();

lab.test('It will return Hello World', (done) => {

    server.inject('/', (res) => {

        Code.expect(res.statusCode).to.equal(200);
        Code.expect(res.result).to.equal('Hello World\n');
        done();
    });
});
