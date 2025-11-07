const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title : {
        type: String,
        required: [true,"Name is Required!"]
    },
    content : {
        type: String,
        required: [true,"Content is required"],
        
   },
},
    {timestamps:true}
)

const Articles = mongoose.model('Articles',articleSchema)
module.exports = Articles