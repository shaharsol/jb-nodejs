const { toXML } = require('jstoxml');

module.exports = async (req, res, next) => {
    try {
      if (req.query.format === 'xml') {
        res.setHeader('Content-type', 'text/xml');
        res.send(toXML(req.data));
      }
      res.json(req.data);
    } catch (err) {
      next(err);
    }
  }