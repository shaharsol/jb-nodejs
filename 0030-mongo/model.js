const mongoose = require('mongoose');
const moment = require('moment');

const userSchema = new mongoose.Schema({
    name: {
        first: String,
        last: String,
    },
    email: String,
    birthday: Date,
});

const User = mongoose.model('User', userSchema);

(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/mymongo');
    console.log('connected');
})()    
