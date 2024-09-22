const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    emailId:{
        type:String,
        required:[true,'Please enter you email'],
        unique:[true,"Email already in use"]
    },
    userName:{
        type:String,
        unique:[true,"Username already in use"],
        required:[true,'Please enter your username']
    },
    password:{
        type:String,
        required:true
    },
},{timestamps:true})

const User = mongoose.model("users",userModel)

module.exports = {
    User
}