const multer  = require('multer')
const path = require('path')
const crypto = require('node:crypto')


const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "public/images/Uploads");
   
       
        },
        filename: function (req, file, cb , err) {
            crypto.randomBytes(12, function (err, byte) {
                const uniqueSuffix = byte.toString('hex').toLowerCase() + path.extname(file.originalname);
                cb(null, uniqueSuffix);
            });

            
            
          
        }
    
})
  
const upload = multer({ storage: storage })

module.exports = upload;