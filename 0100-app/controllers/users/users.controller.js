const addSymbol = async (req, res, next) => {
    try {

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