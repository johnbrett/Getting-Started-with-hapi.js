'use strict';

const Code = require('code');
const Lab = require('lab');
const RimRaf = require('rimraf');
const App = require('../lib');
const UserStore = require('../lib/UserStore.js');

const lab = exports.lab = Lab.script();
const it = lab.test;
const describe = lab.experiment;
const afterEach = lab.afterEach;
const expect = Code.expect;

const levelPath = './.temp';

describe('UserStore', () => {

    afterEach((done) => {

        RimRaf.sync('./.temp');
        done();
    });

    it('creates users', { parallel: false }, (done) => {

        App.init({ port: 0, path: levelPath, isTest: true }, (err, server) => {

            server.inject({ method: 'POST', url: '/user', payload: { name: 'TESTER' } }, (res) => {

                expect(res.statusCode).to.equal(200);
                server.stop(done);
            });
        });
    });

    it('retrives users', { parallel: false }, (done) => {

        App.init({ port: 0, path: levelPath, isTest: true }, (err, server) => {

            server.inject({ method: 'POST', url: '/user', payload: { name: 'TESTER' } }, (response) => {

                server.inject({ method: 'GET', url: `/user/${response.result.id}` }, (res) => {

                    expect(res.statusCode).to.equal(200);
                    server.stop(done);
                });
            });
        });
    });

    it('returns a 404 for user not found', { parallel: false }, (done) => {

        App.init({ port: 0, path: levelPath, isTest: true }, (err, server) => {

            server.inject({ method: 'POST', url: '/user', payload: { name: 'TESTER' } }, (response) => {

                server.inject({ method: 'GET', url: `/user/not-an-id` }, (res) => {

                    expect(res.statusCode).to.equal(404);
                    server.stop(done);
                });
            });
        });
    });

    it('handles errors creating a user', { parallel: false }, (done) => {

        // Lets mock the create user function so it returns an error
        UserStore._internals.createUser = function (user, callback) {

            return callback(true, null);
        };

        App.init({ port: 0, path: levelPath, isTest: true }, (err, server) => {

            server.inject({ method: 'POST', url: '/user', payload: { name: 'TESTER' } }, (res) => {

                expect(res.statusCode).to.equal(400);
                server.stop(done);
            });
        });
    });

});
