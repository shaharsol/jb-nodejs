const mongoose = require('mongoose');
const config = require('config');

module.exports = async (req, res, next) => {
    await mongoose.connect(`mongodb://${config.get('mongo.host')}:${config.get('mongo.port')}/${config.get('mongo.db')}`);
    req.mongo = mongoose;
    return next();
}