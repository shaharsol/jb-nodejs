const express = require('express');
const joi = require('../middlewares/joi');
const mysql = require('../middlewares/mysql');
const { addSymbolValidator } = require('../controllers/users/validator')
const UserSymbol = require('../models/mysql/symbol-value') 

router = express.Router();
router.use(mysql);
const dashboard = (req, res, next) => {
    res.send('dashboard');
}

const logout = (req, res, next) => {
    res.send('logout');
}

const addSymbol = async (req, res, next) => {
    const userSymbol = new UserSymbol(req.pool);
    await userSymbol.add(3, 'req.body.symbol');
    res.send('user added');
}

router.get('/dashboard', dashboard);
router.get('/logout', logout);
router.post('/symbol', joi(addSymbolValidator), addSymbol);

module.exports = router;
