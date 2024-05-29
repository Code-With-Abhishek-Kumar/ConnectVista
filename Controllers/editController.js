const mongoose = require('mongoose')
const userSchema = require('../models/userSchema');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


let EditController = async function (req, res, next) {
   try {
      const token = req.cookies.token;
      let secret = process.env.secret;
      var decoded = jwt.verify(token, secret);
      let { firstName, surname, mobileNo_Email, bio, password } = req.body;
      // res.send(req.body)



      if (!req.file) {
         let edit = await userSchema.updateOne({ mobileNo_Email: decoded.mobileNo_Email.toString() }, {

            $set: {
               firstName: firstName,
               surname: surname,
               mobileNo_Email: mobileNo_Email,
               bio: bio,
          
   
            },
   
   
   
   
         });



      // Check if the update was successful
      if (edit.modifiedCount === 1) {
         res.redirect('/profile')
      } else {
         throw new Error("fail to Update User")
      }

      }else{

         let edit = await userSchema.updateOne({ mobileNo_Email: decoded.mobileNo_Email.toString() }, {

            $set: {
               firstName: firstName,
               surname: surname,
               mobileNo_Email: mobileNo_Email,
               bio: bio,
               Profile_Image: '/images/Uploads/' + req.file.filename,
   
            },
   
   
   
   
         });
 // Check if the update was successful
 if (edit.modifiedCount === 1) {
   res.redirect('/profile')
} else {
   throw new Error("fail to Update User")
}


 

      }

    





      //  console.log(edit)
      //  console.log(edit.firstName)

      //   res.send(edit)

   } catch (error) {
      
      res.render('error', { error })
   }

}

module.exports = EditController;
