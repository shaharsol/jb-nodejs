const SymbolValue = require('../../models/mongo/symbol-value');
const getSymbolValue = async (req, res, next) => {
    const symbolValue = await SymbolValue.findOne({symbol: req.params.symbol}).sort({when: -1}).limit(1)
    return res.json(symbolValue);
}

module.exports = {
    getSymbolValue,
}