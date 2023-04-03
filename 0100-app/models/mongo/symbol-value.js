const mongoose = require('mongoose');

const SymbolValueSchema = new mongoose.Schema({
    symbol: String,
    value: Number,
    createdAt: Date,
});

const SymbolValue = mongoose.model('SymbolValue', SymbolValueSchema);

module.exports = SymbolValue;