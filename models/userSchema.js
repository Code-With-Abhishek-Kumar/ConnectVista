const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

let userSchema = mongoose.Schema({
   firstName:{
      type: String,
      required: true,
   },
   isAdmin:{
      type: Boolean,
      default: true,
   },
   surname:{
      type: String,
      required: true,
   },
   Profile_Image:{
      type:String,
      default:"/images/user.png",
   },
   bio: String,
   gender:{
    type: String,
   },
   mobileNo_Email:{
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  },
  post:[{
     type: mongoose.Schema.ObjectId,
     ref:"post",
  }],

 
});



mongoose.connect(process.env.connect)
  .then(() => console.log('Connected!'));

module.exports = mongoose.model('user', userSchema);