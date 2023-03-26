const addSymbol = async (req, res, next) => {
    try {
        await req.db.execute(`
            insert into users_symbols (user_id, symbol)
            values (?, ?)
        `,[
            2,
            req.body.symbol,
        ])
    } catch (err) {
        next(err);
    }
}

const welcome  = (req, res, next) => {
    res.render('users/welcome')
}

const dashboard  = (req, res, next) => {
    res.render('users/dashboard')
}

module.exports = {
    addSymbol,
    welcome,
    dashboard,
}