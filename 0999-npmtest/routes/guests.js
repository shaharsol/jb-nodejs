const express = require('express');
router = express.Router();

const welcome = (req, res, next) => {
    res.send('welcome');
}
router.get('/welcome', welcome);

module.exports = router;
