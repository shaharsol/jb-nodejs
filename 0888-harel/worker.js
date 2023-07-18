process.env.SUPPRESS_NO_CONFIG_WARNING = true;
const axios = require('axios');
const cheerio = require('cheerio');

const mysql = require('mysql2');
const util = require('util');
const config = require('config');

const UserSymbol = require('./models/mysql/user-symbol');

const connection = mysql.createConnection(config.get('mysql'));

connection.connect = util.promisify(connection.connect);
connection.query = util.promisify(connection.query);



const scrape = async({symbol}) => {
    const result = await axios(`https://www.google.com/finance/quote/${symbol}-USD`);
    const $ = cheerio.load(result.data);
    const value = $('.YMlKec.fxKbKc').text().replace(',','');
    return value;
}


(async () => {

    try{

        const userSymbol = new UserSymbol(connection);
        const symbols = await userSymbol.getDistinct();
        // const symbols = [
        //     'BTC',
        //     'ETH',
        //     'BNT'
        // ]
        console.log(symbols);
        const promises = symbols.map((symbol => scrape(symbol)));
        const results = await Promise.all(promises);
        // console.log(results);

    } catch (err) {
        console.log(err);
    }

})();