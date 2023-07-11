const UserSymbol = require('../../models/mysql/user-symbol')

const addSymbol = async (req, res, next) => {
    try {
        const userSymbol = new UserSymbol(req.pool);
        await userSymbol.create({
            userId: 123,
            symbol: req.body.symbol 
        });
        res.send('user symbol added');
    } catch (err) {
        next(err);
    } 
}

module.exports = {
    addSymbol,
};