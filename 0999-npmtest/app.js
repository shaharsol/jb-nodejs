const express = require('express');
const config = require('config');
const app = express()
const port = config.get('app.port');

const guestsRoute = require('./routes/guests')
const usersRoute = require('./routes/users')
const githubRoute = require('./routes/github')

const notFound = require('./middlewares/404')
const error = require('./middlewares/error')

app.use(express.urlencoded({extended: false}));
app.use('/', guestsRoute);
app.use('/', usersRoute);
app.use('/github', githubRoute);

app.use(notFound);
app.use(error);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



