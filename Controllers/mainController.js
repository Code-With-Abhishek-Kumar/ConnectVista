let postSchema = require('../models/postSchema')
var jwt = require('jsonwebtoken');
const userSchema = require('../models/userSchema')
const CommentSchema = require('../models/comment');



let mainController = async function (req, res, next) {
   try {
    const token = req.cookies.token;
    let secret  =  process.env.secret;
    var decoded = jwt.verify(token, secret);
  

    // find Used based on UserId
    let User = await userSchema.findOne({ mobileNo_Email: decoded.mobileNo_Email})
    //  console.log(User._id)
    let Posts   = await postSchema.find()
    .populate('user')   // Populate the 'user' field
    .populate({
      path: 'comment',       // Populate the 'comments' array in posts
      populate: { path: 'user' } // Populate the 'user' field inside each comment
  });



  
  //  console.log(Posts)




    let data = {
      title:"mainPage",
      ProfilePicture : User.Profile_Image,
      firstName: User.firstName,
      surname: User.surname,
      bio: User.bio,
      id: User._id,
      Posts  
   
   
     
    
    }
  
    res.render('main', data);
   } catch (error) {
    res.render('error', { error })
   }

}

module.exports = mainController;
