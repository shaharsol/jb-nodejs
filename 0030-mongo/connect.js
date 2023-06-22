const mongoose = require('mongoose');

(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/mymongo');
    console.log('connected');
})()


// hint
// mongoose.connect('mongodb://127.0.0.1:27017/mymongo')