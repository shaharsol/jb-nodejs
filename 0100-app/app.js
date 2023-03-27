const express = require('express')
const path = require('path');
const usersRouter = require('./routes/users');

const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 3000
const host = 'localhost';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);

io.on('connection', (socket) => {
    console.log('a user connected');
  });
  
server.listen(port, host, () => {
    console.log(`Example app listening on port ${port}`)
})
