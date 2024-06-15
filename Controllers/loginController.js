'use strict';
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
var errorhandler = require('errorhandler')
const userSchema = require('../models/userSchema');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
var transporter = require('../utility/nodemailer')




let LoginController = async function (req, res, next) {



    try {


        let { email, password } = await req.body;
        //    console.log(password)
        let User = await userSchema.findOne({ mobileNo_Email: email });

        let sendMail = async () => {

            const info = await transporter.sendMail({
                from: 'abhishek9661342993@gmail.com', // sender address
                to: `${email}`, // list of receivers
                subject: " Login Alert ❗", // Subject line
                // text: "Hello world?", // plain text body
                html: `   
    
                <div style="max-width: 600px; margin: 50px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <img src="https://imgs.search.brave.com/m68CBiTZJdOR0V-1cnBlH4ed1N4goV4MFyzzFwYMREE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNy8w/NS9BbGVydC1QTkct/SW1hZ2VzLnBuZw" alt="Login Alert Image" style="max-width: 50%; height: 80px; margin: 0 auto 20px; display: block;">
        <div style="text-align: center;">
            <h2 style="color: red; margin-bottom: 20px;">Login Alert Message</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px; font-weight: 700; font-size: 20px;">Dear User,</p>
            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Your login attempt was unsuccessful. Please check your username and password and try again.</p>
            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">If you continue to experience issues logging in, please contact our support team at <a href="mailto:abhishek9661342993@gmail.com" style="color: #007bff; text-decoration: none;">abhishek9661342993@gmail.com</a>.</p>
            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Best regards, <br> Abhishek Gupta <br>ConnectVista Team</p>
        </div>
    </div>
    
            `
            });

        }
        // if email is  empty  Then Throw Error

        if (!email) {
            let error = new Error('Some Thing Went Wrong');
            error.status = "404";
            throw error; // Throw the error

        }




       

        // if user Not Found in Data base Then Throw  Error
        if (!User) {
            let error = new Error('Some Thing Went Wrong');
            error.status = "404";
            throw error; // Throw the error
        }

        // if Password is  empty  Then Throw Error

        if (!password) {
            let error = new Error('Some Thing Went Wrong');
            error.status = "400";
           await  sendMail()
            throw error;
        }

        bcrypt.compare(password, User.password, async function (err, result) {
            if (err) {
                let error = new Error('Error comparing passwords');
                error.status = "500"
                throw error;

            }

            console.log(result)

            // if Password is incorrect Then Throw Error
            if (result === false) {
             await sendMail();
            
             let error = {
                message :  "Incorrect username or password",
                status : "401"  // Respond with 401 Unauthorized status code
             }
             res.render('error', {
                error
            })


            }
            let secret = process.env.secret;

            if (secret === 'undefined') throw new Error("Secret not found")
            // console.log(email)
            var token = jwt.sign({ mobileNo_Email: email }, secret, {
                expiresIn: '23h'
            });


            // if (!secret) {
            //     throw new Error('Secret key not found'); // Throw an error if secret key is not found
            // }

            res.cookie("token", token)

            // if (!token) {
            //     res.redirect('/') 
            // }
            if (token) {
                res.redirect('/main')

            }




        });
    } catch (error) {

        res.render('error', {
            error
        })
    }


}





module.exports = LoginController // Export UserController
