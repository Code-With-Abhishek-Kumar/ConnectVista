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
const ViewController = require('../Controllers/Post_View_Controller.js')
const multerConfig = require('../utility/multerConfig')
var jwt = require('jsonwebtoken');
const isLoggedin = require('../Middleware/isLogeedin')
const Comment_Controller = require('../Controllers/CommentController.js')
const SetNewPasswordController = require('../Controllers/SetNewPasswordController.js')
const forgotController = require('../Controllers/forgotController.js')
const  OtpController = require('../Controllers/otpController.js')
const userSchema = require('../models/userSchema')
let postSchema = require('../models/postSchema')
// const connectMongo = require('../Middleware/connection');

const transporter = require('../utility/nodemailer')









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

  const token = req.cookies.token;
 

   if(token) res.redirect('main')





  res.render('index', { title: 'Express' });


});


router.get('/feed', isLoggedin , function (req, res, next) {
  // res.render('feed');
  res.redirect('/main')


});


router.post('/comment', isLoggedin ,  Comment_Controller.post);


// console.log(ViewController)

// console.log(reelsController)


router.get('/view/:id', isLoggedin , ViewController );


router.get('/logout',  function (req, res, next) {
  res.clearCookie('token');
  res.redirect('/')


});



router.get('/Reels', isLoggedin , reelsController);



router.get('/like/:id', LikeController );

router.get('/profile', isLoggedin , ProfileController.viewProfile);


router.get('/profile/:id', isLoggedin ,  ProfileController.editProfile );


router.get('/forgot-password', forgotController.ForgotPassword );
router.get('/otp', OtpController.otp  );
router.post('/otp',  OtpController.Process_Otp );
router.get('/password', SetNewPasswordController);
router.post('/password', SetNewPasswordController.Process_Password);

router.post('/forgot-password', forgotController.processForgotForm );



router.post('/Post', isLoggedin , multerConfig.fields([{ name: 'image', maxCount: 1 }, { name: 'Video_file', maxCount: 1 }]), PostController);


router.post('/login', LoginController);



router.post('/register', multerConfig.single('Profile_Image'), User)

router.get('/main', isLoggedin, mainController);
router.post('/edit', isLoggedin , multerConfig.single('Profile_Image'), editController);



module.exports = router;
