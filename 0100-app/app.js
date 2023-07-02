const express = require('express')
const path = require('path');
const usersRouter = require('./routes/users');
const githubRouter = require('./routes/github');
const auth = require('./middlewares/auth');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const morgan = require('morgan');
const port = 3000
const host = 'localhost';
const errorHandler = require('./middlewares/error')
const notFoundErrorHandler = require('./middlewares/404')
const config = require('config');

const MySQLStore = require('express-mysql-session')(session);
const mysqlOptions = {
    host: config.get('mysql.host'),
    port: config.get('mysql.port'),
    user: config.get('mysql.user'),
    password: config.get('mysql.password'),
    database: config.get('mysql.database'),
};
const sessionStore = new MySQLStore(mysqlOptions);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined'));

app.use(cookieParser());
app.use(session({
    store: sessionStore,
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 5,
    },
  }));

app.use(auth.initialize());
app.use(auth.session());

app.use('/users', usersRouter);
app.use('/auth/github', githubRouter);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message from worker', (message) => {
        console.log('io: message from worker', message);
        io.emit('update from express', message);
    })
});

app.use(errorHandler);
app.use(notFoundErrorHandler);

server.listen(port, () => {
    console.log(`Crypto live rates app listening on port ${port}`)
})

module.exports = app;
