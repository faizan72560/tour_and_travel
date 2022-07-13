const jwt= require("jsonwebtoken")
const User= require('../model/userschema')

const authenticate= async (req,res,next)=>{
    try{

        const token= req.cookies.token1;
        console.log(token)
        // console.log(process.env.SECRET_KEY)
        const decode= jwt.verify(token,'process.env.SECRET_KEY')
        console.log(decode)
        req.user=await User.findOne({userId:decode.userId})
        console.log(req.user,"authenticate")
        next()
    }
    catch(err){
        res.status(401).send('unauthorized:No token provided')
        console.log(err)

    }


}

module.exports=authenticate;