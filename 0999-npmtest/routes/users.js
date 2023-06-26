const express = require('express');
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
router.post('/symbol', addSymbol);

module.exports = router;
