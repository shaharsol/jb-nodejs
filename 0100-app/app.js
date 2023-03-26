const express = require('express')
const path = require('path');
const usersRouter = require('./routes/users');

const app = express()
const port = 3000
const host = 'localhost';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/users', usersRouter);


app.listen(port, host, () => {
    console.log(`Example app listening on port ${port}`)
})
