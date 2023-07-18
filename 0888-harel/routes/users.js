const express = require('express');
const inputValidator = require('../middlewares/input-validation')
const mongo = require('../middlewares/mongo')
const { addSymbol, dashboard } = require('../controllers/users/controller');
const { addSymbolValidator } = require('../controllers/users/validator');

// here we start the middleware chain for this router
const router = express.Router();
router.use(mongo);

router.get('/dashboard', dashboard);

router.get('/logout', (req, res) => {
    res.send('logout');
})

router.post('/symbol', inputValidator(addSymbolValidator), addSymbol)

module.exports = router;
