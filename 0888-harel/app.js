process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";

const express = require('express');
const config = require('config');
const port = config.get('app.port');
const path = require('path');

// middlewares
const notFound = require('./middlewares/404')
const errorHandler = require('./middlewares/error')
const mysql = require('./middlewares/mysql')

// 
const guestsRoute = require('./routes/guests');
const usersRoute = require('./routes/users');
const githubRoute = require('./routes/github');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(mysql);

app.use('/', guestsRoute);
app.use('/', usersRoute);
app.use('/github', githubRoute);

app.use(errorHandler);
app.use(notFound);

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
  
