var passport=require('passport');
var mongoose=require('mongoose');
var User=mongoose.model('User');
var LocalStrategy=require('passport-local').Strategy;

passport.use(new LocalStrategy({ usernameField: 'email' },
  function(email, password, done) {
    User.findOne({ email: email}, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


module.exports.register=function(req,res){
  var user=new User();
  user.username=req.body.username;
  user.email=req.body.email;
  user.password=req.body.password;
  console.log(user);
  user.save(function(err){
    if(!err){
      console.log('user saved!!');
    }
    var token;
    token=user.generateJwt();
    res.status(200);
    res.json({
      "token":token
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
