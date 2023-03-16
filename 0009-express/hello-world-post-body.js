const express = require('express')
const app = express()
const port = 3000
const host = 'localhost';

app.use(express.urlencoded({extended: false}));

app.post('/', (req, res) => {
  console.log(req);
  res.send(`id is ${req.body.id}`)
})

app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`)
})


// // hint
// console.log(req)



