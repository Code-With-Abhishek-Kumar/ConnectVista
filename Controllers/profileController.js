// controllers/profileController.js

const jwt = require('jsonwebtoken');
const postSchema = require('../models/postSchema');
const userSchema = require('../models/userSchema');

const ProfileController = {};

// Function to view profile
ProfileController.viewProfile = async (req, res, next) => {
  try {
    const userId = req.params.id;
    let token = req.cookies.token;
    console.log(token)
    let secret = process.env.secret;






console.log(secret)


    var decoded = jwt.verify(token, secret);
    console.log(decoded.mobileNo_Email)
   
    let User = await userSchema.findOne({mobileNo_Email: decoded.mobileNo_Email});
    console.log(User)

  

    let UserId = User._id.toString()

    let Posts = await postSchema.find({ user: UserId });



    if (!User) {
      let error = new Error("No User Found");
      error.status = 404;
      throw error;
    }

    if (!Posts) {
      let error = new Error("No Posts Found");
      error.status = 404;
      throw error;
    }

    let Post = Posts.map(function (elem) {
      User.post.push(elem._id.toString());
      return elem;
    });

    let data = {
      title: `👤 Profile ${User.firstName + " " + User.surname}`,
      ProfilePicture: User.Profile_Image,
      isAdmin: true, // Assuming isAdmin is decoded from JWT
      firstName: User.firstName,
      surname: User.surname,
      bio: User.bio,
      mobileNo_Email: User.mobileNo_Email,
      Post,
    };

    res.render('profile', data);
  } catch (error) {
    res.render('error', { error });
  }
};

// Function to edit profile
ProfileController.editProfile = async (req, res, next) => {
  try {
    const userId1 = req.params.id;
    let token = req.cookies.token;
    console.log(token)
    let secret = process.env.secret;
    let decoded = jwt.verify(token, secret);
    console.log(secret)


    let findByEmail = await userSchema.findOne({mobileNo_Email: decoded.mobileNo_Email});

    let userId2 = findByEmail._id.toString()

    console.log(findByEmail._id.toString())
    
    console.log(decoded.mobileNo_Email)




   
    let User = await userSchema.findOne({_id: userId1});
    console.log(User)


    // Check if the current user is allowed to edit the profile
    if (userId2 !== userId1) {
   

      let Post = await postSchema.find({ user: userId1 });

      let data = {
        title: `👤 Profile ${User.firstName + " " + User.surname}`,
        ProfilePicture: User.Profile_Image,
        isAdmin: false, // Assuming isAdmin is decoded from JWT
        firstName: User.firstName,
        surname: User.surname,
        bio: User.bio,
        mobileNo_Email: User.mobileNo_Email,
        Post,
      };
  
      res.render('profile', data);


    }else{

      let Post = await postSchema.find({ user: userId2 });
      let data = {
        title: `👤 Profile ${User.firstName + " " + User.surname}`,
        ProfilePicture: User.Profile_Image,
        isAdmin: true, // Assuming isAdmin is decoded from JWT
        firstName: User.firstName,
        surname: User.surname,
        bio: User.bio,
        mobileNo_Email: User.mobileNo_Email,
        Post,
      };
  
      res.render('profile', data);


    }

    // Fetch user and update profile logic here
    // Example:
    // let updatedUser = await userSchema.findByIdAndUpdate(userId, { ... });

    res.send("Profile updated successfully!"); // Placeholder response
  } catch (error) {
    res.render('error', { error });
  }
};

module.exports = ProfileController;
