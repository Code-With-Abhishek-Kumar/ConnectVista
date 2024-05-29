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
    })
  } catch (error) {
  
    res.render('error', { error })
  }
}

module.exports = UserController
