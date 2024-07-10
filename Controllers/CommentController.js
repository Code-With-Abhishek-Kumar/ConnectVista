let postSchema = require('../models/postSchema')
var jwt = require('jsonwebtoken');
const userSchema = require('../models/userSchema')
const CommentSchema = require('../models/comment');
const { use } = require('../utility/nodemailer');



let Comment_Controller = {};


Comment_Controller.post = async (req, res) => {
    // res.send(req.body)
    let { User_id, Post_id, comment } = req.body;

    let user = await userSchema.findById(User_id)
    let post = await postSchema.findById(Post_id);


    console.log(post)


    let UserComment = await CommentSchema.create({

        post: Post_id,
        user: User_id,
        Comment: comment,


    })



     await UserComment.populate('user');
     await UserComment.populate('post');

     console.log(UserComment)

    await post.comment.push(UserComment._id)

    await post.save()

    res.redirect('/main')


}




module.exports = Comment_Controller;
