const express = require('express');
const router = express.Router();

const { distinctSymbols } = require('../controllers/api/controller') 

router.get('/distinct-symbols', distinctSymbols)

module.exports = router;