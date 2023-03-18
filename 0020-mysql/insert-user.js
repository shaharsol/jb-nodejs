const mysql = require('mysql2');
const util = require('util');

const connection = mysql.createConnection({
  host: "localhost",
  user: "username",
  password: "password",
  database: 'mydb',
});

connection.connect = util.promisify(connection.connect);
connection.query = util.promisify(connection.query);
(async () => {
  try {
    await connection.connect();
    console.log("Connected!");

    await connection.query(`
      insert into users (username, password, email, birthday)
      values ('shahar', 'password', 'shahar@johnbryce.co.il', '1975-07-18')
    `);
    console.log("user inserted!");

  } catch (e) {
    console.log(e);
  }
})();

