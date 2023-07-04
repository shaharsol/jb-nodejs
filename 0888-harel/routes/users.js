const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
    res.send('dashboard');
})

router.get('/logout', (req, res) => {
    res.send('logout');
})

router.post('/symbol', (req, res) => {
    res.send('add symbol');
})

module.exports = router;
