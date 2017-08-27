var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var Course=require('./course');
var User=require('./user');

var enrollSchema=Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course'},
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  performace: [{
    vedio_id:Schema.Types.ObjectId
  }]
});
var Enroll=mongoose.model('Enroll',enrollSchema);
module.exports=Enroll;
module.exports.enrollUser=function(req,res){
      var course_id=req.params.course_id;
      var user_id=req.params.user_id;
      var enroll=new Enroll();
      enroll.course=course_id;
      enroll.user=user_id;
      enroll.save(function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log(enroll.user.email);
          res.send('User Enrolled');
        }
      })

}
module.exports.checkCourse=function(req,res){
  var user_id=req.params.user_id;
  Enroll.find({user:user_id},function(err,docs){
    if(err){
         console.log(err);
         res.status(404);
         res.send('Not found');
    }
    else{
        res.send(docs);
    }
  });

}
