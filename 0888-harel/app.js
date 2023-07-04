const express = require('express');
const port = '3000';

const guestsRoute = require('./routes/guests');
const usersRoute = require('./routes/users');
const githubRoute = require('./routes/github');

const app = express();

app.use('/', guestsRoute);
app.use('/', usersRoute);
app.use('/github', githubRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
  
