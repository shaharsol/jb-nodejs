const UserSymbol = require('../../models/mysql/user-symbol')

const distinctSymbols = async (req, res, next) => {
    const userSymbol = new UserSymbol(req.pool);
    const symbols = await userSymbol.getDistinct();
    return res.json(symbols);
}

module.exports = {
    distinctSymbols,
}