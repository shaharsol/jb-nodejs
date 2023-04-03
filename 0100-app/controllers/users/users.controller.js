const SymbolValue = require('../../models/mongo/symbol-value');
const UserSymbol = require('../../models/mysql/user-symbol');

const addSymbol = async (req, res, next) => {
    try {

        const userSymbol = new UserSymbol(req.db);
        await userSymbol.add({
            userId: req.user.id,
            symbol: req.body.sumbol,
        });
        res.redirect('/users/dashboard');
    } catch (err) {
        next(err);
    }
}

const welcome  = (req, res, next) => {
    res.render('users/welcome')
}

const dashboard = async (req, res, next) => {
    try {
        const userSymbol = new UserSymbol(req.db);
        const userSymbols = await userSymbol.findByUserId({
            userId: req.user.id
        });

        const promises = [];
        userSymbols.forEach((userSymbol) => promises.push(SymbolValue.findOne({symbol: userSymbol.symbol}).sort({createdAt : -1}).limit(1)))
        const symbolValues = await Promise.all(promises);

        res.render('users/dashboard', {
            userSymbols,
            symbolValues,
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    
    addSymbol,
    welcome,
    dashboard,
}