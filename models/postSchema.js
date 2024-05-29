const mongoose = require('mongoose')



let postSchema = mongoose.Schema({
    description: String,
    video: String,
    image: String,
    date:{
        type:String,
        default:new Date(),
    },
    user:String,
    comment:[{
        type: mongoose.Schema.ObjectId,
        ref: "comment",

    }],
    like:[{
        type: mongoose.Schema.ObjectId,
        ref: "like",

    }]


})

module.exports = mongoose.model('post', postSchema);