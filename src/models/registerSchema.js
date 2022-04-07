const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
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
    repeatPassword:{
        type:String,
        required:true
    },
})

const Register = new mongoose.model("Registeration" , registerSchema);

module.exports = Register;