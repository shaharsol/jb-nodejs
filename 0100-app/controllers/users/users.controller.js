const SymbolValue = require('../../models/mongo/SymbolValue');

const addSymbol = async (req, res, next) => {
    try {
        await req.db.execute(`
            insert into users_symbols (user_id, symbol)
            values (?, ?)
        `,[
            2,
            req.body.symbol,
        ])
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
        const userSymbols = await req.db.execute(`
            select * from users_symbols where user_id = ?
        `,[
            2,
        ]);

        const promises = [];
        userSymbols.forEach((userSymbol) => promises.push(SymbolValue.findOne({symbol: userSymbol.symbol}).sort({createdAt : -1}).limit(1)))
        const symbolValues = await Promise.all(promises);

        console.log(symbolValues);

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