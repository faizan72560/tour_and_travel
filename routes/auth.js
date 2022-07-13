const express=require('express')
const router=express.Router()
const User = require('../model/userschema')
const Place=require('../model/postSchema')
const jwt= require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const {v4 :uuidv4}=require('uuid')
const authenticate = require('../middleware/auth-middleware')



const signup = router.post('/signup', async (req,res)=>{
    
    
    console.log(req.body);
    const {name,email,password}=req.body;
    if(!name|| !email|| !password){
        return res.status(422).json({error:'plzz fill the data properly'});
    }

    User.findOne({email:email}).then((userExist)=>{
        if(userExist){
            return res.status(422).json({error:'email already Exist'})
        }
        const userId=uuidv4()
        const user= new User({userId,name,email,password})
        user.save().then(()=>{
            res.status(201).json({message:'user registered sucessfully',user})
        }).catch((err)=>{
            console.log(err)
            res.status(500).json({error:'Failed to registered'})
        })
    }).catch((err)=>{
        console.log(err)

    })

    // const token = jwt.sign(
    //     { user_id: user._id, email },
    //     'dontshareit',
    //     {
    //       expiresIn: "2h",
    //     }
    //   );

    // user.token = token;
    
    
    
})

  
const login= router.post('/login', async (req,res)=>{
    
    console.log(req.body)
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({error:"plz fill the data"})
        }
        const userlogin=await User.findOne({email:email});
        // console.log(userlogin);
        if(userlogin){

            
            const isMatch= await bcrypt.compare(password,userlogin.password);
            //generating token after token is matched
            if(isMatch){

                // const token= await userlogin.generateAuthToken();
                // console.log(token)
                // res.cookie("jwtoken",token,{
                //     expires:new Date(Date.now()+1000000),
                //     httpOnly:true,
                //     success:true,
                // });

                const token= await userlogin.generateAuthToken();
                console.log(token);
               
                // console.log(process.env.COOKIE_TIME_EXPIRE * 24 * 60 * 60 * 1000);
                const option={
                    expires:new Date(
                        Date.now()+ 3* 24 * 60 * 60 * 1000
                    ),
                    httpOnly:true,
                    
                    
                }
            
                res.status(200).cookie('token1',token,option).json({
                    success:true,
                    token,
                    userlogin 
                })

                

                // cookieToken(userlogin,200,res);
              
            } 
                
             
            if(!isMatch){
                res.status(400).json({error:"user error"})
             }
            //  else{
            //     // res.json({message:"user loggedin sucessfully"})
            // }
        }
        else{
            return res.status(500).json({error:"invalid credentials"})
        }
        
    }catch(err){
        console.log(err);
    }
    
    
  })

  
const logout=router.get('/logout', async(req,res)=>{
    try{

        res.clearCookie("token1")
        res.status(200).cookie("token1", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
          }).json({message:"log out successfully"})
          
        // res.json('logged out')
       
        
    }catch(err){
        console.log(err);
        res.status(500).json({error:"server error"})
    }


})


const loaduser=router.get('/me',authenticate,async(req,res)=>{
    const user = await User.findById(req.user._id)

    if(!user){
        return next(new ErrorHandler('User Not Found', 401));
    }

    res.status(200).json({
        success: true,
        user
    })

    
})



// const loadplaces=router.get('/meto',authenticate,async(req,res)=>{
//     const place = await Place.findById(req.user._id)

//     if(!place){
//         return next(new ErrorHandler('User Not Found', 401));
//     }

//     res.status(200).json({
//         success: true,
//         place
//     })

    
// })



  
 





module.exports=login
module.exports=signup
module.exports=logout


