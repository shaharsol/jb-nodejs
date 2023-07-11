const UserSymbol = require('../../models/mysql/user-symbol')

const addSymbol = (req, res, next) => {

    const userSymbol = new UserSymbol(req.pool);
    userSymbol.create({
        userId: 123,
        symbol: req.body.symbol 
    });
    res.send('user symbol added');
}

module.exports = {
    addSymbol,
};