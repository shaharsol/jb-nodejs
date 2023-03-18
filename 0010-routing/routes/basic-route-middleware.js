const express = require('express');
const router = express.Router();
const someMiddleware = require('./middlewares/some-middleware');

const healthcheck = async (req, res) => {
  res.send('I\'m healthy');
};

router.use(someMiddleware) // will apply to all routes from here
router.get('/healthcheck', healthcheck);

module.exports = router;


