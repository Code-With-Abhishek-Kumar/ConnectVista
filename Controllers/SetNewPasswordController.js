const userSchema = require('../models/userSchema')
const dotenv = require('dotenv').config()
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


// SetNewPasswordController.Process_Password = async (req, res) => {

//     let token = await req.cookies.token;
//     console.log(token)



//     var decoded = jwt.verify(token, dotenv.parsed.secret);
//     console.log("your otp is", decoded.token) // bar
//     console.log("post otp", req.body.otp) // bar

   


// };


module.exports = SetNewPasswordController;