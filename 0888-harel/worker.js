const axios = require('axios');
const cheerio = require('cheerio');

const scrape = async(symbol) => {
    const result = await axios(`https://www.google.com/finance/quote/${symbol}-USD`);
    const $ = cheerio.load(result.data);
    const value = $('.YMlKec.fxKbKc').text().replace(',','');
    return value;
}


(async () => {

    try{

        const symbols = [
            'BTC',
            'ETH',
            'BNT'
        ]

        const promises = symbols.map((symbol => scrape(symbol)));
        const results = await Promise.all(promises);
        console.log(results);

    } catch (err) {
        console.log(err);
    }

})();