process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";

const express = require('express')
const path = require('path');
const usersRouter = require('./routes/users');
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

// const MySQLStore = require('express-mysql-session')(session);
// const mysqlOptions = {
//     host: 'localhost',
//     port: 3306,
//     user: 'username',
//     password: 'password',
//     database: 'mydb',
// };
// const sessionStore = new MySQLStore(mysqlOptions);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined'));

app.use(cookieParser());
app.use(session({
    // store: sessionStore,
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

app.get('/auth/github', auth.authenticate('github', { scope: [ 'user:email' ] })); 

app.get('/auth/github/callback', auth.authenticate('github', { failureRedirect: '/users/welcome', successRedirect: '/users/dashboard' }))

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message from worker', (message) => {
        io.emit('update from express', message);
    })
});
  
server.listen(port, host, () => {
    console.log(`Example app listening on port ${port}`)
})
