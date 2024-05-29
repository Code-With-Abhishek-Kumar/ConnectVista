let postSchema = require('../models/postSchema')
let PostController = async function (req, res, next) {



  try {
    let user = JSON.parse(JSON.stringify(req.body))
   //  console.log("user " + user)
    // console.log("user " + user.user)
    // console.log("req.body.user " + req.body.user)
    // console.log("typeof" + typeof req.body.user)

    if (req.files['image']) {
      let postImage = await postSchema.create({
        user: req.body.user.trim(), //  console.log(req.body);
        image: req.files['image'][0].filename // console.log(req.files['image'][0].filename)
      })
    } else {
      let postImage = await postSchema.create({
        user: req.body.user.trim(), //  console.log(req.body);
        video: req.files['Video_file'][0].filename // console.log(req.files['image'][0].filename)
      })
    }

    res.redirect('/profile')
  } catch (error) {
    res.render('error', { error })
  }
}

module.exports = PostController
