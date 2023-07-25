const mongoose = require('mongoose');
const config = require('config');

// (async() => {
//     await mongoose.connect(`mongodb://${config.get('mongo.host')}:${config.get('mongo.port')}/${config.get('mongo.database')}`);
// })();

mongoose.connect(`mongodb://${config.get('mongo.host')}:${config.get('mongo.port')}/${config.get('mongo.database')}`);

module.exports = (req, res, next) => {
    req.mongoose = mongoose;
    next();
}