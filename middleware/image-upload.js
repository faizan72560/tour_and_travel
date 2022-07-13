const multer= require('multer')
const placeSchema=require('../model/postSchema')

const storage= multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./client/uploads/");

    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})

console.log("middleware")

const upload=multer({storage:storage});
module.exports= upload