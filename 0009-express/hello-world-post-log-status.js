const express = require('express')
const app = express()
const port = 3000
const host = 'localhost';

const logStatus = require('./middlewares/log-status')

app.use(express.urlencoded({extended: false}));

app.use(logStatus);

app.post('/', (req, res) => {
  console.log(req);
  res.send(`id is ${req.body.id}`)
})

app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`)
})


// // hint
// console.log(req)



