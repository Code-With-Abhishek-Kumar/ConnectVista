
let postSchema = require('../models/postSchema')



let ReelsController = async function  (req, res) {
 
  let Posts = await postSchema.find()
// res.send(a)
// let videoSrc = a.forEach(element => {
//    let videos = element.video;

//   return videos;

// });
// if () {
  
// }
// console.log("rtrgt" , videoSrc )

let data = {
    title:"Watch Your Fev Reels",
    Posts,
}
// console.log(a)
res.render('reels' , data)
}






module.exports = ReelsController;