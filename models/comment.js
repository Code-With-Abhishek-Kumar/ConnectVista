const mongoose = require('mongoose')



let CommentSchema = mongoose.Schema({
    Comment: String,
    post:{
        type: mongoose.Schema.ObjectId,
        ref: "post",

    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
    }
 
  
})

module.exports = mongoose.model('comment', CommentSchema);