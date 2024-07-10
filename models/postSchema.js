const mongoose = require('mongoose')



let postSchema = mongoose.Schema({
    description: String,
    video: String,
    image: String,
    date:{
        type:String,
        default:new Date(),
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "user",
    },
    comment:[{
        type: mongoose.Schema.ObjectId,
        ref: "comment",

    }],
    like:[{
        type: mongoose.Schema.ObjectId,
        ref: "user",

    }],

    Dislike:[{
        type: mongoose.Schema.ObjectId,
        ref: "user",

    }]


})

module.exports = mongoose.model('post', postSchema);