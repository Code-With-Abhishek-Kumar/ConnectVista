var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv').config()
let postSchema = require('../models/postSchema')
const userSchema = require('../models/userSchema')

let ProfileController = async function (req, res, next) {
  try {
    const token = req.cookies.token
    // console.log(cookieValue)
    let secret = process.env.secret
    var decoded = jwt.verify(token, secret)

    let User = await userSchema.findOne({
      mobileNo_Email: decoded.mobileNo_Email
    })



    console.log(User)


    let Posts = await postSchema.find({ user: User._id })

    let Post = Posts.map(function (elem) {
    //  console.log()
     User.post.push(elem._id.toString())
    return elem;

    })
    // console.log(User)

 
// console.log(Post.length)

    let data = {
      title: `👤 Profile ${User.firstName + " " + User.surname}`,
      ProfilePicture: User.Profile_Image,
      isAdmin: true,
      firstName: User.firstName,
      surname: User.surname,
      bio: User.bio,
      mobileNo_Email: User.mobileNo_Email,
      Post,

    }

    res.render('profile', data)
  } catch (error) {
    res.render('error', { error })
  }
}

module.exports = ProfileController;
