const express = require('express')
const session = require('express-session');
const cookieParser = require('cookie-parser');

const path = require('path');
const auth = require('./auth');
const app = express()
const port = 3000
const host = 'localhost';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 5,
    },
  }));

app.use(auth.initialize());
app.use(auth.session());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/dashboard', (req, res) => {
    if(!req.user) {
      res.redirect('/login');
    }
    res.send(`Dashboard of ${JSON.stringify(req.user)}`)
})

app.get('/login', (req, res) => {
    if(req.user) {
      res.redirect('/dashboard');
    }
    res.render('index');
})

app.get('/logout', (req, res) => {
  if(req.user) {
    req.logout();
  }
  res.redirect('/login');
})

app.post('/login', auth.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
}));

app.listen(port, host, () => {
    console.log(`Example app listening on port ${port}`)
})

// hint
// req.user // <- this is where passport saves the logged in user record...
