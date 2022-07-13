const mongoose = require('mongoose');
const bcrypt= require('bcryptjs');
const jwt=require("jsonwebtoken")
const {v4 :uuidv4}=require('uuid')

// const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: { type:Object},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
// //   posts:[
// //     {
// //         type:mongoose.Schema.Types.ObjectId,
// //         ref:"place"
// //     }
// ],


//   token:{type:String, }
//   image: { type: String, required: true },
//   places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }]
});

// userSchema.plugin(uniqueValidator);

userSchema.pre('save', async function(next){
    console.log('hee')
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
        // this.cpassword=await  bcrypt.hash(this.cpassword,12);       
        
    }
    next();
});



userSchema.methods.generateAuthToken= async function(){
    try{
        let token=jwt.sign({userId:this.userId},'process.env.SECRET_KEY')
        // this.tokens=this.tokens.concat({token:token})
        await this.save();
        console.log(token)
        return token;

    }catch(err){
        console.log(err)
    }
}





module.exports = mongoose.model('User', userSchema);
