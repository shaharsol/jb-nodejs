const mysql = require('mysql2');
const util = require('util');

const connection = mysql.createConnection({
  host: "localhost",
  user: "username",
  password: "password",
  database: 'mydb',
});

// connection.connect = util.promisify(connection.connect);
myNewFunc = util.promisify(connection.connect).bind(connection);

(async () => {
  try {
    // await connection.connect();
    await myNewFunc();
    console.log("Connected!");
  } catch (e) {
    console.log(e);
  }
})();





