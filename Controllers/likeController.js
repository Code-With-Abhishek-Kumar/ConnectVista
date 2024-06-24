// Import necessary modules
let postSchema = require('../models/postSchema');
const userSchema = require('../models/userSchema')
var jwt = require('jsonwebtoken');

// Define your controller function
let LikeController = async function LikeController(req, res, next) {
    try {
        // Fetch the post based on the ID from the request parameters
        let post = await postSchema.findById(req.params.id);
         console.log(post)

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Get the token from cookies and verify it
        const token = req.cookies.token;
        let secret = process.env.secret;
        var decoded = jwt.verify(token, secret);



        // Check if the user has already liked the post
     let email = decoded.mobileNo_Email;
     let User = await userSchema.findOne({mobileNo_Email : email} );
        if (post.like.indexOf(User._id) === -1) {
                post.like.push(User._id.toString());
                await post.save();
                res.redirect('/feed')
                // return res.status(204).end(); // No content response
                
                
        }else{
            post.like.splice(post.like.indexOf(User._id) , 1 )

            await post.save();
            res.redirect('/feed')
            // return res.status(204).end(); // No content response
        
      
        //    console.log("like")
        //  console.log(User._id.toString())
       
 
        //    console.log(post)
        // return res.status(204).end(); // No content response
        }
     
        // Add the user to the likes array
     


        // Save the updated post with the new like
       
       

       
    } catch (err) {
        console.error('Error in LikeController:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = LikeController;
