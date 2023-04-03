const mysql = require('mysql2');
const config = require('config');
const util = require('util');
const { db } = require('../models/mongo/symbol-value');

const pool = mysql.createPool({
    host: config.get('mysql.host'),
    user: config.get('mysql.user'),
    password: config.get('mysql.password'),
    database: config.get('mysql.database'),
    port: config.get('mysql.port'),
    connectionLimit: 10,
    waitForConnections: true,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
}) 


pool.query = util.promisify(pool.query);
pool.execute = util.promisify(pool.execute);

const middleware = (req, res, next) => {
    req.db = pool;
    return next();
};

module.exports = {
    db: pool,
    middleware,
}