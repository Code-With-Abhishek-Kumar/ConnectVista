const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
var jwt = require('jsonwebtoken');
const { notify } = require('../routes');



function isLogin(req, res, next ){
    const token = req.cookies.token;
     if(!token) res.redirect('/');
     next()
}




module.exports = isLogin;