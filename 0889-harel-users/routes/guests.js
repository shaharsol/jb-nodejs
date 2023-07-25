const express = require('express');
const router = express.Router();
const enforceGuest = require('../middlewares/enforce-guest')

// router.use(enforceGuest);

router.get('/welcome', enforceGuest, (req, res) => {
    res.render('welcome', {});
})

module.exports = router;
