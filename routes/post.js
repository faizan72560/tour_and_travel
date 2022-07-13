const express= require('express')
const mongoose=require('mongoose')
const cloudinary=require("cloudinary")
const router= express.Router()
const Place= require('../model/postSchema')
console.log('heloo')
const {v4 :uuidv4}=require('uuid')
const { find } = require('../model/postSchema')
const authenticate = require('../middleware/auth-middleware')
// const upload = require('../middleware/image-upload')
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
// const upload = multer({ dest: "client/uploads/" });


const createpost=router.post('/add',authenticate,  async (req,res)=>{

    try{
        
        console.log(req.user.userId)

        const title1=req.body.title
        
        
        console.log(title1);
        const {title,description,adress,location}=req.body;
        console.log(req.body)
        const result=await cloudinary.v2.uploader.upload(req.files.image.tempFilePath,{folder:"places_image"})
        if(!title || !description||!adress){
            return res.status(422).json({error:'plzz fill the data properly'});
        }
        else{
            
            
            
            
            
            // const place= new Place({userId,title,description,image:{public_id:result.public_id,url:result.secure_url},adress,location})
            // place.save().then(()=>{
            //     res.status(201).json(place)
            // }).catch((err)=>{
            //     console.log(err)
            //     res.status(500).json({error:'Failed to add post'})
            // })
            const place= await Place.create({userId:req.user.userId,title,description,image:{public_id:result.public_id,url:result.secure_url},adress,location})
            res.status(201).json({place})
        }
    }catch(err){
            console.log(err)
        }
        
            
    




})


const getpost=router.get('/get/:pid', async (req,res)=>{

    const postId= req.params.pid;
    try{

        const post= await Place.findById(postId)
        console.log(post)
        
        res.json({post})
    }catch(err){
        console.log(err)
    }


})


const getuserbyuserid=router.get('/getplacebyuserid',authenticate,async(req,res)=>{
    // const userid=req.params.pid
    // const userid=mongoose.Types.ObjectId(req.user.userId)

    
    console.log(req.user.userId)
    
    try{
        const post=await Place.find({userId:req.user.userId})
        res.status(200).json({post})

    }catch(err){
        console.log(err)

    }

})



const updatepost=router.put('/updatepost/:pid',async(req,res)=>{
    // const {title,description,adress,location}=req.body;
    
    console.log(req.body)
    const postid=JSON.parse(req.params.pid)

    console.log(postid)
    try{
        const post=await Place.findByIdAndUpdate(postid,req.body,{new:true,
            runValidators:true,
            useFindAndModify:false})

        // const post=await Place.findById(req.params.pid)
        console.log(post)
        // res.json(post)
        
              
            console.log(post)
            res.json({post})

    }catch(err){
        console.log(err)

    }

  

})


const deletepost=router.delete('/deletepost/:pid',async(req,res)=>{
    
    const postid=req.params.pid
    console.log(postid)
    try{
        const post=await Place.findById(postid)
        console.log(Place)
        // res.json(post)
        await post.remove()
        res.json({message:"post deleted"})

    }catch(err){
        console.log(err)

    }

  

})
 
 
 



module.exports=createpost
module.exports=getpost
module.exports=getuserbyuserid
module.exports=updatepost
module.exports=deletepost
