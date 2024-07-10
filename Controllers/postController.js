
var jwt = require('jsonwebtoken');
const userSchema = require('../models/userSchema')
let postSchema = require('../models/postSchema')


let PostController = async function (req, res, next) {



  try {


    const token = req.cookies.token;
    // console.log(cookieValue)
    let secret  =  process.env.secret;
    var decoded = jwt.verify(token, secret);
  
    let User = await userSchema.findOne({ mobileNo_Email: decoded.mobileNo_Email})
    let userId = User._id.toString()



    // console.log("typeof" + typeof req.body.user)

    if (req.files['image']) {
      let postImage = await postSchema.create({
        user: userId.trim(), //  console.log(req.body);
        image: req.files['image'][0].filename // console.log(req.files['image'][0].filename)
      })
      console.log(req.files)
    } else {
      let postImage = await postSchema.create({
        user: userId.trim(), //  console.log(req.body);
        video: req.files['Video_file'][0].filename // console.log(req.files['image'][0].filename)
      })
      console.log(req.files)
    }

    res.redirect('/profile')
  } catch (error) {
    res.render('error', { error })
  }
}

module.exports = PostController
