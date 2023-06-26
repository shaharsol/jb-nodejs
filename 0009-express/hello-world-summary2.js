const express = require('express')
const app = express()
const port = 3000
const axios = require('axios');
const { toXML } = require('jstoxml');

const auth = require('./middlewares/auth')
const getUsers = require('./middlewares/get-users')
const filterUsers = require('./middlewares/filter-users')
const formatResponse = require('./middlewares/format-response')

const notFound = require('./middlewares/404')
const error = require('./middlewares/error')

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(auth);

app.use('/users', getUsers);
app.use('/users', filterUsers);
app.use('/users', formatResponse);

app.use(notFound);
app.use(error);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



