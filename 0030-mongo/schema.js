const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        first: String,
        last: String,
    },
    email: String,
    birthday: Date,
});

(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/mymongo');
    console.log('connected');


})()    


// hint
new mongoose.Schema(SchemaObject)