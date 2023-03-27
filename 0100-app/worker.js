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

    const html = await axios('https://www.coindesk.com')
    const $ = cheerio.load(html.data);
    // console.log($('.typography__StyledTypography-owin6q-0 .iYkMvL .price-values')[0].text());

    const symbolValue = new SymbolValue({
        Symbol: 'BTC',
        value: $('.pclqee').text(),
        createdAt: new Date()
    });
    await symbolValue.save();
    console.log('saved symbolValue', symbolValue);
    
})();

