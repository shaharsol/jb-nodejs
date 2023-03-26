const addSymbol = (req, res, next) => {
    res.send('done');
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