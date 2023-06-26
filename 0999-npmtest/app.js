const express = require('express')
const app = express()
const port = 3000

const notFound = require('./middlewares/404')
const error = require('./middlewares/error')

app.use(notFound);
app.use(error);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



