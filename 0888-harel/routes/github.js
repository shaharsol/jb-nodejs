const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')

router.get('/authenticate', auth.authenticate('github', { scope: [ 'user:email' ] }))
router.get('/callback', auth.authenticate('github', { failureRedirect: '/login' }))

module.exports = router;
