const joi = require('joi');

const addSymbolValidator = joi.object({
    symbol: joi.string().required().length(3).uppercase()
});

module.exports = {
    addSymbolValidator,
}