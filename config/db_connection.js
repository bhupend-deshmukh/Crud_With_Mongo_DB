const mongoose = require('mongoose');
require('dotenv').config()
let MONGO_URL = process.env.MONGO_URL
mongoose.connect(MONGO_URL,{ useNewUrlParser: true ,useUnifiedTopology: true} ,(err)=>{
    if (err) throw err;
    console.log('database connected successfully...');
})

module.exports = mongoose