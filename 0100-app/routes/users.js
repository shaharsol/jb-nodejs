const express = require('express');
const router = express.Router()

const welcome  = (req, res, next) => {
    res.render('users/welcome')
}

const dashboard  = (req, res, next) => {
    res.render('users/dashboard')
}

router.get('/welcome', welcome);
router.get('/dashboard', dashboard);

module.exports = router;