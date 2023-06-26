const express = require('express');
router = express.Router();

const authenticate = (req, res, next) => {
    res.send('ok');
}

const callback = (req, res, next) => {
    res.send('ok');
}

router.get('/', authenticate);
router.get('/callback', callback);

module.exports = router;
