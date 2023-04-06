const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    nom : {
        type : String ,
        require : true
    }
})

module.exports = mongoose.model('Category', CategorySchema)