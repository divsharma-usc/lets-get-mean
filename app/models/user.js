var mongoose=require('mongoose');
var crypto=require('crypto');
var jwt=require('jsonwebtoken');
var Schema=mongoose.Schema;
var userSchema=new Schema({
  username:{
    type: String,
    unique: true,
    required: true
  },
  email:{
    type: String,
    unique: true,
    required: true
  },
  password:{
    type:String,
    required:true
  }
});
userSchema.methods.setPassword=function(password){
  this.salt=crypto.randomBytes(16).toString('hex');
  this.hash=crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
}
userSchema.methods.validPassword=function(password){
   return this.password===password;
}
userSchema.methods.generateJwt=function(){
  var expiryDate=new Date();
  expiryDate.setDate(expiryDate.getDate()+10);
  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    exp: parseInt(expiryDate.getTime()/1000),
  },"My mean app");
}
var User=mongoose.model('User',userSchema);
module.exports=mongoose.model('User',userSchema);
