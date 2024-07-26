const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        required: true,
        default: 'user'
    },
    registerDate:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('user', userSchema);