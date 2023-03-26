const mysql = require('mysql2');
const config = require('config');
const util = require('util');

(async () => {

    const connection = mysql.createConnection({
        host: config.get('mysql.host'),
        user: config.get('mysql.user'),
        password: config.get('mysql.password'),
        database: config.get('mysql.database'),
    })

    connection.connect = util.promisify(connection.connect);

    await connection.connect();

    console.log('connected');

})();