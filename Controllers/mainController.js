let postSchema = require('../models/postSchema')
var jwt = require('jsonwebtoken');
const userSchema = require('../models/userSchema')

let mainController = async function (req, res, next) {
   try {
    const token = req.cookies.token;
    // console.log(cookieValue)
    let secret  =  process.env.secret;
    var decoded = jwt.verify(token, secret);
  
    let User = await userSchema.findOne({ mobileNo_Email: decoded.mobileNo_Email})
    //  console.log(User._id)
    let Posts = await postSchema.find().populate('user');

    console.log(Posts)

  
   
    // let AllUser = await userSchema.find()
    // console.log(AllUser)
    let data = {
      title:"mainPage",
      ProfilePicture : User.Profile_Image,
      firstName: User.firstName,
      surname: User.surname,
      bio: User.bio,
      id: User._id,
      Posts,
     
    
    }
  
    res.render('main', data);
   } catch (error) {
    res.render('error', { error })
   }

}

module.exports = mainController;
