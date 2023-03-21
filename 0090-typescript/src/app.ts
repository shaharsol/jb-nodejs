import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import path from 'node:path';
import auth from './auth';
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
    res.send('Dashboard')
})

app.get('/login', (req, res) => {
    res.render('index');
})

app.post('/login', auth.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
}));

app.listen(port, host, () => {
    console.log(`Example app listening on port ${port}`)
})
