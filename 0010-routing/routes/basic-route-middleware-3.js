const express = require('express');
const router = express.Router();
const someMiddleware = require('./middlewares/some-middleware');
const someMiddleware2 = require('./middlewares/some-middleware2');
const someMiddleware3 = require('./middlewares/some-middleware3');

const healthcheck = async (req, res) => {
  res.send('I\'m healthy');
};
 
// will apply only to this GET routing
router.get('/healthcheck', someMiddleware, someMiddleware2, someMiddleware3, healthcheck); 

module.exports = router;


