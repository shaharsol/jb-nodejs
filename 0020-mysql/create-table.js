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
      CREATE TABLE users (
        id int auto_increment,
        username varchar(255) not null,
        password varchar(255) not null,
        email varchar(255) not null,
        birthday date not null,
        primary key (id)
      )    
    `);
    console.log("created table users!");

  } catch (e) {
    console.log(e);
  }
})();


// hint

connection.query(`
  some SQL query
`);
