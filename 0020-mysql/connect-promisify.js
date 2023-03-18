const mysql = require('mysql2');
const util = require('util');

const connection = mysql.createConnection({
  host: "localhost",
  user: "username",
  password: "password"
});

connection.connect = util.promisify(connection.connect);
(async () => {
  try {
    await connection.connect();
    console.log("Connected!");
  } catch (e) {
    console.log(e);
  }
})();



// hints
const util = require('util');
someCallbackFunction = util.promisify(someCallbackFunction);
await someCallbackFunction();



const mysql = require('mysql2/promise');






