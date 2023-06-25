const fs = require('fs/promises');
const path = require('path');

(async () => {
    // const data = await fs.readFile(path.join('inner-directory','content.txt'), 'utf8')
    const data = await fs.readFile('inner-directory/content.txt', 'utf8')
    console.log(data);
})();

