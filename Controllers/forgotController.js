const mongoose = require('mongoose');
const userSchema = require('../models/userSchema');
const dotenv = require('dotenv').config()
var jwt = require('jsonwebtoken')
var transporter = require('../utility/nodemailer')
/*  
 Speakeasy is a JavaScript library commonly used for implementing two-factor authentication (2FA)
  and other security features in Node.
 js and web applications. It provides functionality for generating and validating one-time passwords (OTPs) based
  on various algorithms, including time-based OTPs (TOTPs) and counter-based OTPs (HOTPs)

*/
const speakeasy = require('speakeasy');


// Initialize forgotController as an object
let forgotController = {};

// GET request for displaying the forgot password form
forgotController.ForgotPassword = (req, res) => {
  let data = {
    title: "Forgot Password",
    otp: false,
    password: false,
    email: true,
    error: ""
  };

  res.render('forgot', data); // Render your forgot password form view


};

// POST request for processing forgot password form submission
forgotController.processForgotForm = async (req, res) => {

  const { email } = await req.body;
  console.log(email)

  if (!email) {
    let data = {
      title: "Forgot Password",
      otp: false,
      password: false,
      email: true,
      error: "Email is required",
    };

    return res.render('forgot', data); // Render your forgot password form view

  }

  let user = await userSchema.findOne({ mobileNo_Email: email })

  console.log(user)

  if (!user) {
    let data = {
      title: "Forgot Password",
      otp: false,
      password: false,
      email: true,
      error: "Invalid Email id",
    };

    return res.render('forgot', data); // Render your forgot password form view
  } else {
    var emailToken = jwt.sign({ email }, dotenv.parsed.secret, { expiresIn: '1h' });
    res.cookie('emailToken', emailToken)


    var secret = speakeasy.generateSecret({ length: 20 });

    var token = speakeasy.totp({
      secret: secret.base32,
      encoding: 'base32'
    });
  
    console.log(token)
    var tokenValidates = speakeasy.totp.verify({
      secret: secret.base32,
      encoding: 'base32',
      token: token,
      window: 6
    });
    console.log(tokenValidates)
  
    var otpToken = jwt.sign({ token }, dotenv.parsed.secret, { expiresIn: '1h' });
    res.cookie('otpToken', otpToken)


  const info = await transporter.sendMail({
    from: 'abhishek9661342993@gmail.com', // sender address
    to: `${email}`, // list of receivers
    subject: " Forgot Password 🎉🎊", // Subject line
    // text: "Hello world?", // plain text body
    html: `   
  
  
        <div style="font-family: Helvetica,Arial,sans-serif; min-width:600px;overflow:auto; line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">ConnectVista </a>
    </div>
    <p style="font-size:1.1em">Hi, </p>
    <p>Thank you for choosing ConnectVista. Use the following OTP to reSet your Password. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${token}</h2>
    <p style="font-size:0.9em;">Regards,<br />ConnectVista Team</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>ConnectVista </p>
      <p>Bagodar</p>
      <p>India</p>
   
    </div>
  </div>
  </div>
          `
  });


  }











  // console.log()








  res.redirect('/otp')
  // Logic to send password reset instructions to the provided email
  // This could include generating a token, sending an email with a reset link, etc.
  // After processing, redirect the user to a confirmation page or display a message
  // res.send('Password reset instructions sent to your email.');
};

// Export the forgotController object
module.exports = forgotController;
