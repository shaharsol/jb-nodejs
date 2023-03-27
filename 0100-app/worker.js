const mongoose = require('mongoose');
const config = require('config');
const cheerio = require('cheerio');
const axios = require('axios');

(async () => {
    await mongoose.connect(`mongodb://${config.get('mongo.host')}:${config.get('mongo.port')}/${config.get('mongo.db')}`);

    const SymbolValueSchema = new mongoose.Schema({
        symbol: String,
        value: Number,
        createdAt: Date,
    });
    
    const SymbolValue = mongoose.model('SymbolValue', SymbolValueSchema);

    const html = await axios('https://www.google.com/finance/quote/BTC-USD')
    const $ = cheerio.load(html.data);
    const value = $('.YMlKec.fxKbKc').text().replace(',','');
    
    const symbolValue = new SymbolValue({
        Symbol: 'BTC',
        value: parseFloat(value),
        createdAt: new Date()
    });
    await symbolValue.save();
    console.log('saved symbolValue', symbolValue);
    
})();

