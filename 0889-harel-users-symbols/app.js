process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";

const express = require('express');
const config = require('config');
const port = config.get('app.port');
const path = require('path');

// middlewares
const notFound = require('./middlewares/404')
const errorHandler = require('./middlewares/error')

// 
const apiRoute = require('./routes/api');

const http = require('http');
const morgan = require('morgan');

const app = express();
const server = http.createServer(app);

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(morgan('combined'));

app.use('/api', apiRoute);

app.use(errorHandler);
app.use(notFound);

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
  
