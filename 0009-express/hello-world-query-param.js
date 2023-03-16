const express = require('express')
const app = express()
const port = 3000
const host = 'localhost';

app.get('/', (req, res) => {
  res.send(`query param is ${req.query.id}`)
})

app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`)
})


// hint
console.log(req.query)



