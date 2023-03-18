const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: "localhost",
  user: "username",
  password: "password"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// hints
mysql.createConnection({
    host,
    user,
    password,
});

connection.connect(callbackFunction)