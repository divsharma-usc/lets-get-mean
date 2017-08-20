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
    required:true
  }
});
userSchema.methods.setPassword=function(password){
  this.salt=crypto.randomBytes(16).toString('hex');
  this.hash=crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
};
userSchema.methods.validPassword=function(password){
  var hash=crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
  return this.hash===hash;
};
userSchema.methods.generateJwt=function(){
  var expiryDate=new Date();
  expiry.setDate(expiry.getDate()+10);
  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    exp: parseInt(expiry.getTime()/1000),
  },"My mean app");
}
module.exports=mongoose.model('User',userSchema);
