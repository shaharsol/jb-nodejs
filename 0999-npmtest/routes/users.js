const express = require('express');
const joi = require('../middlewares/joi');
const { middleware: mysql } = require('../middlewares/db');
const { addSymbolValidator } = require('../controllers/users/validator')
const UserSymbol = require('../models/mysql/user-symbol') 

const router = express.Router();
// router.use(mysql);
const dashboard = async (req, res, next) => {
    const userSymbol = new UserSymbol(req.db);
    const userSymbols = await userSymbol.findByUserId({
        userId: req.user.id
    });

    res.render('users/dashboard', {
        userSymbols,
    })
}

const logout = (req, res, next) => {
    req.logout()
    res.redirect('/welcome')
}

const addSymbol = async (req, res, next) => {
    const userSymbol = new UserSymbol(req.pool);
    await userSymbol.add(req.user.id, 'req.body.symbol');
    res.redirect('/dashboard');
}

router.get('/dashboard', dashboard);
router.get('/logout', logout);
router.post('/symbol', joi(addSymbolValidator), addSymbol);

module.exports = router;
