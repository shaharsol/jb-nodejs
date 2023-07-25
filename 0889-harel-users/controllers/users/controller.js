const UserSymbol = require('../../models/mysql/user-symbol')
const SymbolValue = require('../../models/mongo/symbol-value')
const axios = require('axios');
const config = require('config');

const addSymbol = async (req, res, next) => {
    try {
        const userSymbol = new UserSymbol(req.pool);
        await userSymbol.create({
            userId: req.user.id, // req.user.id
            symbol: req.body.symbol 
        });
        res.redirect('/dashboard');
    } catch (err) {
        next(err);
    } 
}

const getSymbolValue = async (symbol) => {
    const results = await axios(`http://${config.get('usersSymbolsService.host')}:${config.get('usersSymbolsService.port')}/api/get-symbol-value/${symbol}`)
    return results.data;
}

const dashboard = async (req, res, next) => {
    try {
        const userSymbol = new UserSymbol(req.pool);
        const userSymbols = await userSymbol.getForUser({userId: req.user.id});

        // const promises = userSymbols.map((userSymbol) => SymbolValue.findOne({symbol: userSymbol.symbol}).sort({when: -1}).limit(1))
        const promises = userSymbols.map((userSymbol) => getSymbolValue(userSymbol.symbol))
        const symbolValues = await Promise.all(promises);

        res.render('dashboard', {
            username: req.user?.id,
            userSymbols,
            symbolValues,
        });
    } catch (err) {
        next(err);
    }
}
 
module.exports = {
    addSymbol,
    dashboard,
};