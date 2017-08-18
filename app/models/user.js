var mongoose=require('mongoose');
var crypto=require('crypto');
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
module.exports=mongoose.model('User',userSchema);
