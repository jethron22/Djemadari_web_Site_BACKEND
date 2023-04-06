const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
   
    username : {
        type : String,
        require : true,
        unique : true
    }, 
    email : {
        type : String,
        require : true,
        unique : true
    },

    phone : {
           type : String,
           require : true, 
    },
    password : {
        type : String,
        require : true,
    }, 
    profilPic : {
        type : String,
        default : "",
    }

}, {
    timestamps : true,
})

module.exports = mongoose.model('User',  UserSchema)