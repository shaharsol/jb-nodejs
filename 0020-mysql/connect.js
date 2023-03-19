const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: "localhost",
  user: "username",
  password: "password",
  database: 'mydb',
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
