const mongoose = require("mongoose")

const ServicesSchema = new mongoose.Schema({
    title : {
        type : String ,
        require : true,
        unique : true
    },
    description : {
        type : String ,
        require : true,
        
    },
    userName : {
        type : String ,
        require : true,
        
    },
    image : {
        type : String ,
        require : false,
        
    },
    categories : {
        type : Array,
        require : false,   
    }
}, {
    timestamps : true
})

module.exports = mongoose.model('Service',  ServicesSchema)