const express = require('express');
const router = express.Router();

router.get('/authenticate', (req, res) => {
    res.send('authenticate');
})

router.get('/callback', (req, res) => {
    res.send('callback');
})

module.exports = router;
