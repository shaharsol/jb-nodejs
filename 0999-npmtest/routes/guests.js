const express = require('express');
router = express.Router();

const welcome = (req, res, next) => {
    res.render('users/welcome',{});
}
router.get('/welcome', welcome);

module.exports = router;
