const express = require('express');
const router = express.Router()
const { 
    addSymbol, 
    welcome, 
    dashboard, 
    logout,
} = require('../controllers/users/users.controller');
const { addSymbolValidator } = require('../controllers/users/users.validators');
const { middleware: db } = require('../middlewares/db');
const enforeAuth = require('../middlewares/enforce-auth');
const enforceGuest = require('../middlewares/enforce-guest');
const mongo = require('../middlewares/mongo');

const joi = require('../middlewares/joi');

router.use(db);
router.use(mongo);
router.get('/welcome', enforceGuest, welcome);
router.get('/dashboard', enforeAuth, dashboard);
router.get('/logout', enforeAuth, logout);

router.post('/symbol', joi(addSymbolValidator), addSymbol);

module.exports = router;