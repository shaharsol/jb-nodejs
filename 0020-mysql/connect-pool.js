const mysql = require('mysql2');
const util = require('util');

const pool = mysql.createPool({
  host: "localhost",
  user: "username",
  password: "password",
  database: 'mydb',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
});

pool.query = util.promisify(pool.query);

(async () => {
  try {
    const result = await pool.query(`
      select * from users;
    `)
    console.log(result);
  } catch (e) {
    console.log(e);
  }
})();

const tasks = await getTasks();
res.render('tasks/list', {
  tasks
});



