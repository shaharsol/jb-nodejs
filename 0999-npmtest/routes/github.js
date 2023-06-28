const express = require('express');
router = express.Router();

const authenticate = (req, res, next) => {
    res.send('authenticate');
}

const callback = (req, res, next) => {
    res.send('callback');
}

router.get('/authenticate', authenticate);
router.get('/callback', callback);

module.exports = router;
