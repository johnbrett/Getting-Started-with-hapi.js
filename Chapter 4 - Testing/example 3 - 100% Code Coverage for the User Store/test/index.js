'use strict';

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const RimRaf = require('rimraf');
const App = require('../lib');
const UserStore = require('../lib/user-store');

const lab = exports.lab = Lab.script();
const it = lab.test;
const describe = lab.experiment;
const afterEach = lab.afterEach;
const expect = Code.expect;

const levelPath = './.temp';

describe('server', () => {

    afterEach((done) => {

        RimRaf.sync('./.temp');
        done();
    });

    it('starts and returns hapi server object', { parallel: false }, (done) => {

        App.init({ port: 0, path: levelPath, isTest: true }, (err, server) => {

            expect(err).to.not.exist();
            expect(server).to.be.instanceof(Hapi.Server);

            server.stop(done);
        });
    });

    it('starts server on provided port', { parallel: false }, (done) => {

        App.init({ port: 5000, path: levelPath, isTest: true }, (err, server) => {

            expect(err).to.not.exist();
            expect(server.info.port).to.equal(5000);

            server.stop(done);
        });
    });

    it('errors with problems registering plugins', { parallel: false }, (done) => {

        const original = UserStore.register;
        UserStore.register = function (server, options, next) {

            UserStore.register = original;
            return next(new Error('register failed'));
        };

        UserStore.register.attributes = {
            name: 'Mock UserStore to throw error'
        };

        App.init({ port: 0, path: levelPath, isTest: true }, (err, server) => {

            expect(err).to.exist();
            done();
        });
    });

});
