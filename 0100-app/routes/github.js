const express = require('express');
const router = express.Router()

const auth = require('../middlewares/auth');

router.get('/', auth.authenticate('github', { scope: [ 'user:email' ] })); 

router.get('/callback', auth.authenticate('github', { failureRedirect: '/users/welcome', successRedirect: '/users/dashboard' }))

module.exports = router;