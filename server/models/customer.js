const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    tel:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    details:{
        type: String,
        required: true
    }
},
{
    timestamps: true // this enables the createdAt and updatedAt fields
});


module.exports = mongoose.model('user', userSchema)