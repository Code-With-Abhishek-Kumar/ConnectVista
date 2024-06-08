// console.log(cookieValue)
let postSchema = require('../models/postSchema')
var jwt = require('jsonwebtoken');

let LikeController = async function LikeController(req, res, next) {
    console.log("htt")
    // res.send(await req.cookies)
    let posts = await postSchema.find({ _id: req.params.id })

    // Assuming your array is named 'posts'
    let like = posts.forEach(function(post) {
        // Access properties of each post object
        // console.log(post._id)
        // console.log(post.image)
        // console.log(post.date)
        // console.log(post.user)
        console.log(post.like)
        const token = req.cookies.token
        let secret = process.env.secret
        var decoded = jwt.verify(token, secret)
        let postLikeArray = post.like;
        // postLikeArray.push(decoded.mobileNo_Email.toString())


        console.log(decoded.mobileNo_Email.toString())
    });


    console.log('like', like)


    console.log(await posts)


  
    res.redirect('/main')

}

module.exports = LikeController;
