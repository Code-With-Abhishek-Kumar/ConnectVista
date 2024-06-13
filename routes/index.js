const path = require('path')
var express = require('express');
var router = express.Router();
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const User = require('../Controllers/User');
const mainController = require('../Controllers/mainController')
const PostController = require('../Controllers/postController')
let reelsController = require('../Controllers/reelsController')
const editController = require('../Controllers/editController')
const LikeController = require('../Controllers/likeController')
const ProfileController = require('../Controllers/profileController')
const multerConfig = require('../utility/multerConfig')
var jwt = require('jsonwebtoken');
const isLoggedin = require('../Middleware/isLogeedin')

const userSchema = require('../models/userSchema')
let postSchema = require('../models/postSchema')
// const connectMongo = require('../Middleware/connection');

const transporter = require('../utility/nodemailer')



router.get('/sent', async function (req, res, next) {
 
try {
 

  // transporter.sendMail(mailOptions, function(error, info){
  //   if (error) {
  //     console.log(` Error:` ,  error);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });
  
} catch (error) {
  res.send(error);
}


});



// const middleware = require('../Middleware/middleware')
const LoginController = require('../Controllers/loginController');

/* GET home page. */

router.use(express.json());

router.use(express.urlencoded({ extended: false }));



router.use(function (err, res, req, next) {
  console.error(err.message)
  next(err)

})

// router.use('/error', (req, res , err) => {
//   res.render('error', { error: Error });
// });

router.use(function (err, req, res, next) {
  res.render('error', { error: Error });

  next(err)
});
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });


});



router.get('/Reels', reelsController);

router.get('/like/:id', LikeController );

router.get('/profile', isLoggedin, ProfileController);


router.get('/profile/:id', isLoggedin ,  async function (req, res, next) {
  // http://localhost:3000/profile/665be2bcc01b9aa6f8d047ed

  try {
    // Access the id parameter from the URL
    const userId = await req.params.id;

    // res.send(userId);
    let Posts = await postSchema.find({ user: userId })
    let User = await userSchema.findById(userId)

    if (!User) {
      // If no user is found, you can throw an error or handle it in some other way

      let error = new Error("No User Found");
      error.status = 404;
      throw error;
    }


    //  console.log(await User)


    if (!Posts) {
      // If no user is found, you can throw an error or handle it in some other way

      let error = new Error("No User Found");
      error.status = 404;
      throw error;
    }

    console.log(Posts)
    // console.log(Posts._id)
    let Post = Posts.map(function (elem) {
      //  console.log(elem._id.toString())
      User.post.push(elem._id.toString())
      return elem;

    })

    // console.log(User)
    //  console.log(Post)



    let data = {
      title: `👤 Profile ${User.firstName + " " + User.surname}`,
      ProfilePicture: User.Profile_Image,
      isAdmin: false,
      firstName: User.firstName,
      surname: User.surname,
      bio: User.bio,
      mobileNo_Email: User.mobileNo_Email,
      Post,

    }
    console.log(await data)

    res.render('profile', data)
  } catch (error) {
    res.render('error', { error })
    // res.send(error.message);
  }


});

router.post('/Post', isLoggedin , multerConfig.fields([{ name: 'image', maxCount: 1 }, { name: 'Video_file', maxCount: 1 }]), PostController);


router.post('/login', LoginController);



router.post('/register', multerConfig.single('Profile_Image'), User)

router.get('/main', isLoggedin, mainController);
router.post('/edit', isLoggedin, multerConfig.single('Profile_Image'), editController);



module.exports = router;
