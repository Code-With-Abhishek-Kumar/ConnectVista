
let postSchema = require('../models/postSchema')
var jwt = require('jsonwebtoken');
const userSchema = require('../models/userSchema')


async function Post_View_Controller(req , res){
    try {

       const token = req.cookies.token;
        let secret  =  process.env.secret;
        var decoded = jwt.verify(token, secret);
        let User = await userSchema.findOne({ mobileNo_Email: decoded.mobileNo_Email})



        let postID = req.params.id;  // Extract postID from request parameters





        let post = await postSchema.findById(postID).populate('user');   // find Post on the basic of id and populate User field
      
        console.log(post) // log Post
        // If post is not found, handle Error
        if (!post) {
           
            let error =  Error('Post Not Found');
            error.status = 400;
            throw Error;
        }

        // // Log the retrieved post object to the console
        // console.log(post);

        // // Render the 'view' template and pass the post data to it
        res.render('view', { post: post  , id: User._id});
    } catch (error) {
        // Handle any errors that occur during the query or rendering
        console.error("Error fetching post:", error);
        res.render('error' , { error })
    }
}

// ../Controllers/Post_View_Controller.js


module.exports = Post_View_Controller;



// Assuming this is inside an Express.js route handler function


// module.exports = PostController
