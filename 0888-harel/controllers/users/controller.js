const addSymbol = (req, res, next) => {
    res.send('user sent ' + req.body.symbol + ' symbol');
    res.send(`user sent ${req.body.symbol} symbol`);
}

module.exports = {
    addSymbol,
};