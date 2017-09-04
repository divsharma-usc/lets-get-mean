var passport=require('passport');
var mongoose=require('mongoose');
var User=require('../models/user');
var LocalStrategy=require('passport-local').Strategy;
var bcrypt=require('bcryptjs');

passport.use(new LocalStrategy({ usernameField: 'email' },
   function(email, password, done) {
     User.findOne({ email: email}, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      user.validPassword(password,user.password,function(err,isMatch){
                  if(err) throw err;
                  if(isMatch){
                     return done(null,user);
                   }
                  else{
                     return done(null,false,{message:'Invalid Password'});
                  }
     });
  });
}));

module.exports.register=function(req,res){
  var user=new User();
  user.username=req.body.username;
  user.email=req.body.email;
  user.role=1;
  bcrypt.genSalt(10,function(err,salt){
      bcrypt.hash(req.body.password,salt,function(err,hash){
          user.password=hash;
          user.save(function(err){
            if(!err){
              console.log('user saved!!');
            }
            var token;
            console.log(user);
            token=user.generateJwt();
            res.status(200);
            res.json({
              "token":token
            });
          });
      });
  });
};

module.exports.login=function(req,res){
    passport.authenticate('local',function(err,user,info){
    var token;
    if(err){
      res.status(404).json(err);
      return;
    }
    if(user){
      token=user.generateJwt();
      res.status(200);
      res.json({
        "token":token
      });
    }
    else{
      res.status(401).json(info);
    }
  })(req,res);
}
module.exports.getUser=function(req,res){
    User.getUser(req,res);
}
