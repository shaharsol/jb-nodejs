const mongoose = require('mongoose');
const config = require('config');
const cheerio = require('cheerio');
const axios = require('axios');
const mysql = require('mysql2');
const util = require('util');


const { io } = require('socket.io-client');
const socket = io(`http://${config.get('worker.app.host')}:${config.get('worker.app.port')}`);

const SymbolValue = require('./models/mongo/symbol-value');
const scrape = async (symbol) => {
    try{
        const html = await axios(`https://www.google.com/finance/quote/${symbol.symbol}-USD`)
        const $ = cheerio.load(html.data);
        const value = $('.YMlKec.fxKbKc').text().replace(',','');
        
        const symbolValue = new SymbolValue({
            symbol: symbol.symbol,
            value: parseFloat(value),
            createdAt: new Date()
        });
        await symbolValue.save();
        await socket.emit('message from worker', {
            symbol: symbolValue.symbol,
            value: symbolValue.value,
        })
        console.log(`saved ${symbolValue.value} for ${symbolValue.symbol}`);
        return symbolValue;
    
    } catch (e) {
        console.log(e);
    }

}

const loop = async (connection) => {
    const symbols = await connection.query(`
        select distinct symbol from users_symbols 
    `)
    console.log (`loop: found this symbol array: ${symbols.join(',')}`)

    const promises = [];
    symbols.forEach(symbol => promises.push(scrape(symbol)));
    await Promise.allSettled(promises);

    console.log(`looped through ${symbols.join(',')}. Sleeping for ${config.get('worker.interval')}`)

    setTimeout(() => loop(connection), config.get('worker.interval'));
}

(async () => {
    await mongoose.connect(`mongodb://${config.get('mongo.host')}:${config.get('mongo.port')}/${config.get('mongo.db')}`);

    const connection = mysql.createConnection({
        host: config.get('mysql.host'),
        user: config.get('mysql.user'),
        password: config.get('mysql.password'),
        database: config.get('mysql.database'),
        port: config.get('mysql.port'),
    })

    connection.connect = util.promisify(connection.connect);
    connection.query = util.promisify(connection.query);

    await connection.connect();

    console.log('connected to mysql');

    loop(connection);
    
})();

