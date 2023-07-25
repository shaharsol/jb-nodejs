const express = require('express');
const inputValidator = require('../middlewares/input-validation')
const mongo = require('../middlewares/mongo')
const enforceUser = require('../middlewares/enforce-user')
const { addSymbol, dashboard } = require('../controllers/users/controller');
const { addSymbolValidator } = require('../controllers/users/validator');

// here we start the middleware chain for this router
const router = express.Router();
router.use(mongo);
// router.use(enforceUser);

router.get('/dashboard', enforceUser, dashboard);

router.get('/logout', enforceUser, (req, res) => {
    req.logout(() => {});
    res.redirect('/welcome');
})

router.post('/symbol', enforceUser, inputValidator(addSymbolValidator), addSymbol)

module.exports = router;
