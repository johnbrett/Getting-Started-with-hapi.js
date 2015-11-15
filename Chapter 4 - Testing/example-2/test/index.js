const Code = require('code');
const Lab = require('lab');

const lab = exports.lab = Lab.script();

lab.describe('Testing example', () => {

    lab.test('fails here', (done) => {

        Code.expect(false).to.be.true();
        return done();
    });

    lab.test('passes here', (done) => {

        Code.expect(true).to.be.true();
        return done();
    });

});
