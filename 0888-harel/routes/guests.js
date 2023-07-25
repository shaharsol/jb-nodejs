const express = require('express');
const router = express.Router();
const enforceGuest = require('../middlewares/enforce-guest')

// router.use(enforceGuest);

router.get('/welcome', (req, res) => {
    res.render('welcome', {});
})

module.exports = router;
