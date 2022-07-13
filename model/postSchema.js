const mongoose= require('mongoose')
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: { type: String, required: true },
  description : { type: String, required: true, },
  image : {  public_id:{type:String},url:{type:String}   },
  adress : { type: String, required: true, },
  location : { type: String, required: true, },
  userId:{type:Object}
  // user:{type:mongoose.Schema.Types.ObjectId,ref:"User"}

  
});
module.exports = mongoose.model('place', placeSchema);
