const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')

const { getSymbolValue } = require('../controllers/api/controller')
const mongo = require('../middlewares/mongo');

router.use(mongo);

router.get('/get-symbol-value/:symbol', getSymbolValue)


module.exports = router;
