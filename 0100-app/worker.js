const mongoose = require('mongoose');
const config = require('config');
const cheerio = require('cheerio');
const axios = require('axios');
const mysql = require('mysql2');
const util = require('util');

const scrape = async (symbol) => {
    console.log(symbol);
    const html = await axios(`https://www.google.com/finance/quote/${symbol.symbol}-USD`)
    const $ = cheerio.load(html.data);
    const value = $('.YMlKec.fxKbKc').text().replace(',','');
    
    console.log(value);
    const symbolValue = new SymbolValue({
        Symbol: 'BTC',
        value: parseFloat(value),
        createdAt: new Date()
    });
    await symbolValue.save();
    console.log('saved symbolValue', symbolValue);
    return symbolValue;

}

const loop = async (connection) => {
    const symbols = await connection.query(`
        select distinct symbol from users_symbols 
    `)

    const promises = [];
    symbols.forEach(symbol => promises.push(scrape(symbol)));
    await Promise.allSettled(promises);

    setTimeout(() => loop(connection), config.get('worker.interval'));
}
(async () => {
    await mongoose.connect(`mongodb://${config.get('mongo.host')}:${config.get('mongo.port')}/${config.get('mongo.db')}`);

    const SymbolValueSchema = new mongoose.Schema({
        symbol: String,
        value: Number,
        createdAt: Date,
    });
    
    const SymbolValue = mongoose.model('SymbolValue', SymbolValueSchema);

    const connection = mysql.createConnection({
        host: config.get('mysql.host'),
        user: config.get('mysql.user'),
        password: config.get('mysql.password'),
        database: config.get('mysql.database'),
    })

    connection.connect = util.promisify(connection.connect);
    connection.query = util.promisify(connection.query);

    await connection.connect();

    console.log('connected to mysql');

    loop(connection);


    
})();

