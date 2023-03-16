const express = require('express');
const router = express.Router();

const healthcheck = async (req, res) => {
  res.send('I\'m healthy');
};

router.get('/healthcheck', healthcheck);

module.exports = router;
