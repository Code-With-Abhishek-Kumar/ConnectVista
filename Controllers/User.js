const path = require('path')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv').config()
var transporter = require('../utility/nodemailer')
// var transporter = require('../utility/multerConfig')
const userSchema = require('../models/userSchema')
var jwt = require('jsonwebtoken')

let UserController = async function (req, res, next) {
  try {

    let { firstName, surname, mobileNo_Email, password, Gender, bio } = req.body


    // console.log(req.file)

    bcrypt.genSalt(12, async function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
   
          if (req.file === undefined) {
            let user = await userSchema.create({
              firstName,
              surname,
              mobileNo_Email,
              password: hash,
              Gender,
              bio,
            });
          } else {
            let user = await userSchema.create({
              firstName,
              surname,
              mobileNo_Email,
              password: hash,
              Gender,
              bio,
              Profile_Image: '/images/Uploads/' + req.file.filename,
            });
          }
        var token = jwt.sign(
          { mobileNo_Email: req.body.mobileNo_Email },
          dotenv.parsed.secret,
          { expiresIn: '22h' }
        )

       
        res.cookie('token', token)
        res.redirect('/main')
      })

      const info = await transporter.sendMail({
        from: 'abhishek9661342993@gmail.com', // sender address
        to: `${mobileNo_Email}`, // list of receivers
        subject: " Confirm your Registration 🎉🎊", // Subject line
        // text: "Hello world?", // plain text body
        html: `    <div style="max-width: 600px; margin: 50px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center;">
            <div style="font-size: 24px; margin-bottom: 10px;">🌟✨</div>
            <h1>Welcome to ConnectVista! Confirm your Registration</h1>
            <p style="color:  red; font-weight: 700; font-size: 20px;">Dear ${firstName + " " + surname},</p>
            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                🎈🎉 Welcome to ConnectVista, your new online community where you can connect with others, share your thoughts, and engage in discussions! 🌟✨
            </p>
            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                We're thrilled to have you on board, and we're excited for you to start exploring all that ConnectVista has to offer. But first, we need to confirm your registration.
            </p>
            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Please click on the following link to confirm your email address and complete your registration:
            </p>
            <a href="#" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; transition: background-color 0.3s;">Confirmation Link</a>
            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                If you did not sign up for ConnectVista, please ignore this email or contact us immediately at <a href="mailto:abhishek9661342993@gmail.com" style="color: #007bff; text-decoration: none;">abhishek9661342993@gmail.com</a>.
            </p>
            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                We can't wait to see you in our community!
            </p>
            <p style="color:  red; font-size: 18px; line-height: 1.6; margin-bottom: 20px; font-weight: 500;">Best regards,<br>Abhishek Gupta<br>ConnectVista Team</p>
        </div>
          </div>
          `
      });
    

      console.log('Email sent: ' + info.response)


    })
  } catch (error) {
  
    res.render('error', { error })
  }
}

module.exports = UserController
