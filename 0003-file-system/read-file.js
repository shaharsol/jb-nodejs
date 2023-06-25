const fs = require('fs');
const util = require('util');

const promisified = util.promisify(fs.readFile);

(async () => {
    const data = await promisified('content.txt', 'utf8');
    console.log(data);
})();

// fs.readFile('content.txt', 'utf8', (err, data) => {
//     if (err) {
//         return console.log(err)
//     }

//     return console.log(data);
// })

