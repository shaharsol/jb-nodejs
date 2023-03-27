const addSymbol = async (req, res, next) => {
    try {
        await req.db.execute(`
            insert into users_symbols (user_id, symbol)
            values (?, ?)
        `,[
            2,
            req.body.symbol,
        ])
        res.redirect('/users/dashboard');
    } catch (err) {
        next(err);
    }
}

const welcome  = (req, res, next) => {
    res.render('users/welcome')
}

const dashboard = async (req, res, next) => {
    try {
        const userSymbols = await req.db.execute(`
            select * from users_symbols where user_id = ?
        `,[
            2,
        ])
        res.render('users/dashboard', {
            userSymbols,
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    
    addSymbol,
    welcome,
    dashboard,
}