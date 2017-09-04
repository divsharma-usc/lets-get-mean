var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
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
  },
  role:{
    type: Number,
    required: true
  }
});
userSchema.methods.validPassword=function(password,hash,callback){
     bcrypt.compare(password, hash, function(err, isMatch) {
		 if(err) throw err;
		 callback(null,isMatch);
});
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
module.exports.getUser=function(req,res){
  var id=req.params["id"];
  User.findOne({_id:id},function(err,doc){
         if(err){
           console.log(err);
         }
         else{
           console.log(doc);
           res.send(doc);
         }
  });
}
