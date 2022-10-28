const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');

require("../config/db_connection")

const details = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
     type:String,
     unique:true,
     required:true
    },
    password:{
        type:String,
        required:true
    }
})


const data = mongoose.model('crud_details', details)

module.exports = data