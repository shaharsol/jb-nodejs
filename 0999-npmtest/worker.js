const config = require('config');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
// const { db } = require('./middlewares/db');
// const UserSymbol = require('./models/mysql/user-symbol')
const util = require('util');
const mysql = require('mysql2');

const symbolValueSchema = new mongoose.Schema({
    symbol: String,
    timestamp: Date,
    value: Number,
});

const SymbolValue = mongoose.model('SymbolValue', symbolValueSchema);

const scrape = async (symbol) => {
    const html = await axios(`https://www.google.com/finance/quote/${symbol}-USD`);
    const $ = cheerio.load(html.data);
    const value = $('.YMlKec.fxKbKc').text().replace(',','');

    const symbolValue = new SymbolValue({
        symbol,
        timestamp: new Date(),
        value,
    });
    await symbolValue.save();
}

const getSymbols = async () => {
    const symbols = await pool.execute(`select distinct symbol from users_symbols`);
    // [ { symbol: 'BTC' } ]
    return symbols;
}

const pool = mysql.createPool({
    host: config.get('mysql.host'),
    user: config.get('mysql.user'),
    password: config.get('mysql.password'),
    database: config.get('mysql.database'),
    port: config.get('mysql.port'),
    connectionLimit: 10,
    waitForConnections: true,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
}) 

pool.query = util.promisify(pool.query);
pool.execute = util.promisify(pool.execute);

const loop = async () => {
    const symbols = await pool.execute(`select distinct symbol from users_symbols`);
    console.log(`will scrape: ${symbols.map(({symbol}) => symbol)}`)
    const promises = [];
    symbols.forEach(({symbol}) => {
        promises.push(scrape(symbol));
    })
    await Promise.allSettled(promises);
    setTimeout(loop, 10000)

}

(async () => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/mymongo');
        
        loop();    
    } catch (err) {
        console.log(err)
    }
})();