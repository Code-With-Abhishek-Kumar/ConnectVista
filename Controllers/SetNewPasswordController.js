const userSchema = require('../models/userSchema')
const dotenv = require('dotenv').config()
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

let SetNewPasswordController = {};


SetNewPasswordController = async (req, res) => {
    try {



        let data = {
            title: "Forgot Password",
            otp: false,
            password: true,
            email: false,

        };
        res.render('forgot', data); // Render your forgot password form view


    } catch (error) {



        res.render('error', { error })
    }


};


SetNewPasswordController.Process_Password = async (req, res) => {

  try {
    let email = await req.cookies.emailToken;

    var decoded = jwt.verify(email, dotenv.parsed.secret);
    console.log("your email is", decoded.email) // bar


    let { password, Confirm_password } = await req.body;
    console.log(password, Confirm_password)
    if (password !== Confirm_password) {
        // throw new Error("Check your password")
        console.log('error')

    }


    bcrypt.genSalt(12, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            let user = await userSchema.findOneAndUpdate({ mobileNo_Email: decoded.email.toString() }, {
                $set: {
                    password: hash,


                },
            })


        //    console.log(user) 

            if(err) {
                throw new Error(err.message)
            }

        });
    });










    res.clearCookie("emailToken");
    res.clearCookie("otpToken");
    res.redirect('/')
  } catch (error) {
    res.render('error' , {error})
  }




};


module.exports = SetNewPasswordController;