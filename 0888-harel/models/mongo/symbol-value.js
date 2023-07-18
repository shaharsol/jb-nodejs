const mongoose = require('mongoose');

const symbolValueSchema = new mongoose.Schema({
    symbol: String,
    value: String,
    when: Date,
});

const SymbolValue = mongoose.model('SymbolValue', symbolValueSchema);

module.exports = SymbolValue;

