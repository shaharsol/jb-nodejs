const axios = require('axios');

(async () => {
  const response = await axios('https://jsonplaceholder.typicode.com/users?_limit=2');
  console.log(response.data);
})()

// hints
console.log('message');
process.argv
process.env.NAME


const fs = require('fs');
// or
import * as fs from 'node:fs';
// which to use?



