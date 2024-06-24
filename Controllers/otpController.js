const userSchema = require('../models/userSchema')
const dotenv = require('dotenv').config()
var jwt = require('jsonwebtoken')

let OtpController = {};


OtpController.otp = async (req, res) => {
    try {

        let data = {
            title: "Otp",
            otp: true,
            password: false,
            email:false,
            error: ""
           
        };
        res.render('forgot', data); // Render your forgot password form view
    } catch (error) {

        res.render('error', { error })
    }


};


OtpController.Process_Otp = async (req, res) => {
    let token = await req.cookies.otpToken;
    var decoded = jwt.verify(token, dotenv.parsed.secret );
    console.log(token)
    console.log(decoded)


    // var decoded = jwt.verify(token, dotenv.parsed.secret);
    // console.log("your otp is", decoded.token) // bar
    // console.log("post otp", req.body.otp) // bar

    if (decoded.token !== req.body.otp) {
        console.log(decoded.token != req.body)

        let data = {
            title: "Enter Otp",
            otp: true,
            password: false,
            email: false,
            error: "Please Enter Correct Otp"

        };


        res.render('forgot', data); // Render your forgot password form view
    } 

    if (decoded.token === req.body.otp) {
        console.log("Correct Password")
        res.redirect('/password')
    }



};


module.exports = OtpController;