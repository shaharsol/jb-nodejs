const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('general', () => {
    it('should insert a user_symbol', (done) => {
        chai.request(server)
        .post('/users/symbol')
        .send({symbol: 'BTC'})
        .end((err, res) => {
            expect(res.statusCode).to.equal(200)
            done()
        })

    })
    it('should fail when symbol is too long', (done) => {
        chai.request(server)
        .post('/users/symbol')
        .send({symbol: 'BTCCCCCC'})
        .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            done();
        })
    })
    it('should have a link to connect', (done) => {
        chai.request(server)
        .get('/users/welcome')
        .send()
        .end((err, res) => {
            expect(res.statusCode).to.equal(200)
            expect(res.text).to.contain('Connect')
            done();
        })

    })
})


