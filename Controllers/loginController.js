'use strict';
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
var errorhandler = require('errorhandler')
const userSchema = require('../models/userSchema');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')





let LoginController = async function (req, res, next) {



    try {
        let { email, password } = await req.body;
        //    console.log(password)
        let User = await userSchema.findOne({ mobileNo_Email: email });

        if (!email) {
            let error = new Error('Empty User Name');
            error.status = "404";
            throw error; // Throw the error
        }

        if (!User) {
            let error = new Error('User not found');
            error.status = "404";
            throw error; // Throw the error
        }

        if (!password) {
            let error = new Error('Empty password');
            error.status = 400;
            throw error;
        }

        bcrypt.compare(password, User.password, function (err, result) {
            if (err) {
                let error = new Error('Error comparing passwords');

                error.status = "500"
                throw error;

            }

            console.log(result)


            if (result === false){
                res.send
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
