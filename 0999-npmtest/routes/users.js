const express = require('express');
const joi = require('../middlewares/joi');
const { addSymbolValidator } = require('../controllers/users/validator')


router = express.Router();

const dashboard = (req, res, next) => {
    res.send('dashboard');
}

const logout = (req, res, next) => {
    res.send('logout');
}

const addSymbol = (req, res, next) => {
    res.send('addSymbol')
}

router.get('/dashboard', dashboard);
router.get('/logout', logout);
router.post('/symbol', joi(addSymbolValidator), addSymbol);

module.exports = router;
