const path = require('path')
var express = require('express');
var router = express.Router();
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const User = require('../Controllers/User');
const mainController = require('../Controllers/mainController')
const PostController  = require('../Controllers/postController')
const editController = require('../Controllers/editController')
const ProfileController = require('../Controllers/profileController')
const multerConfig = require('../utility/multerConfig')
var jwt = require('jsonwebtoken');
const isLoggedin = require('../Middleware/isLogeedin')

// const connectMongo = require('../Middleware/connection');


let userSchema = require('../models/userSchema')
// const middleware = require('../Middleware/middleware')
const LoginController = require('../Controllers/loginController');

/* GET home page. */

router.use(express.json());

router.use(express.urlencoded({ extended: false }));



router.use(function(err , res , req , next){
  console.error(err.message)
  next(err)
  
})

// router.use('/error', (req, res , err) => {
//   res.render('error', { error: Error });
// });

router.use(function( err ,req, res, next) {
  res.render('error', { error: Error });

 next(err)
});
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

 
});

router.post('/Post', multerConfig.fields([{ name: 'image', maxCount: 1 }, { name: 'Video_file', maxCount: 1 }]) , PostController );


router.post('/login',  LoginController);



router.post('/register', multerConfig.single('Profile_Image') ,  User)

router.get('/main', isLoggedin , mainController);
router.get('/profile', isLoggedin , ProfileController );
router.post('/edit', isLoggedin , multerConfig.single('Profile_Image') , editController);



module.exports = router;
