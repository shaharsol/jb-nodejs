const express = require('express');
const config = require('config');
const app = express()
const port = config.get('app.port');

const guestsRoute = require('./routes/guests')
const usersRoute = require('./routes/users')
const githubRoute = require('./routes/github')

const notFound = require('./middlewares/404')
const error = require('./middlewares/error')
const auth = require('./middlewares/auth');
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({extended: false}));
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



app.use('/', guestsRoute);
app.use('/', usersRoute);
app.use('/github', githubRoute);

app.use(notFound);
app.use(error);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



