const mongoose = require('mongoose')



let link = mongoose.Schema({

    post:[{
        type: mongoose.Schema.ObjectId,
        ref: "post",

    }],
 
  
})

module.exports = mongoose.model('comment', CommentSchema);