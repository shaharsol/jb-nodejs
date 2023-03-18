const express = require('express');
const router = express.Router();
const someMiddleware = require('./middlewares/some-middleware');

const healthcheck = async (req, res) => {
  res.send('I\'m healthy');
};
 
// will apply only to this GET routing
router.get('/healthcheck', someMiddleware, healthcheck); 

module.exports = router;


