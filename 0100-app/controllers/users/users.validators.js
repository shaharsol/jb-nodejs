const joi = require('joi');

const addSymbolValidator = joi.object({
    symbol: joi.string().required(),
});

module.exports = {
    addSymbolValidator,
}