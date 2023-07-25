process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";

const express = require('express');
const config = require('config');
const port = config.get('app.port');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
// middlewares
const notFound = require('./middlewares/404')
const errorHandler = require('./middlewares/error')
const mysql = require('./middlewares/mysql')
const auth = require('./middlewares/auth')

// 
const guestsRoute = require('./routes/guests');
const usersRoute = require('./routes/users');
const githubRoute = require('./routes/github');
const apiRoute = require('./routes/api');

const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log(`a user connected`);
    socket.on('update from worker', (msg) => {
        io.emit('symbol value update', msg);
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

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

app.use(morgan('combined'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(mysql);

app.use('/', guestsRoute);
app.use('/', usersRoute);
app.use('/github', githubRoute);
app.use('/api', apiRoute);

app.use(errorHandler);
app.use(notFound);

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
  
