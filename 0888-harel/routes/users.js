const express = require('express');
const router = express.Router();

const inputValidator = require('../middlewares/input-validation')

const { addSymbol } = require('../controllers/users/controller');
const { addSymbolValidator } = require('../controllers/users/validator');

router.get('/dashboard', (req, res) => {
    res.send('dashboard');
})

router.get('/logout', (req, res) => {
    res.send('logout');
})

router.post('/symbol', inputValidator(addSymbolValidator), addSymbol)

module.exports = router;
