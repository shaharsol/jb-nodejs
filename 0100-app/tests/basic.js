const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
let should = chai.should;

chai.use(chaiHttp);

describe('general', () => {
    it('should insert a user_symbol', () => {
        chai.request(server)
        .post('/users/symbol')
        .send({symbol: 'BTC'})
        .end((err, res) => {
            res.should.have.status(200)
        })

    })
    it('should fail when symbol is too long', () => {
        chai.request(server)
        .post('/users/symbol')
        .send({symbol: 'BTCCCCCC'})
        .end((err, res) => {
            res.should.have.status(422)
        })
    })
})
