var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema=new Schema({
  course_id:{
    type:String,
    required: true
  },
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  author:{
    type:String,
    required:true
  },
  NoOfVedios:{
    type:Number,
    required:true
  },
  rating:{
    type:Number,
    required:true
  },
  vedios:[
    {
      vedio_title:{
        type:String,
        required:true
      },
      vedio_url:{
        type:String,
        required:true
      }
    }
  ]
});
var Course=mongoose.model('Course',courseSchema);
module.exports=Course;
module.exports.getCourses=function(callback){
    Course.find({},callback);
}
module.exports.removeCourse=function(course_id,callback){
      Course.find({_id:course_id}).remove(callback);
}
module.exports.getCourse=function(course_id,req,res){
      Course.find({_id:course_id},function(err,docs){
               res.send(docs);
      })
}
module.exports.updateCourse=function(req,res){
      const course_id=req.params.course_id;
      Course.findOne({_id:course_id},function(err,doc){
        console.log(req.body);
        doc.course_id=req.body.courseid;
        doc.title=req.body.title;
        doc.description=req.body.description;
        doc.author=req.body.author;
        doc.NoOfVedios=req.body.no_of_vedios;
        doc.vedios=req.body.secretLairs;
        console.log(doc);
        doc.save(function(err){
          if(err){
            console.log(err);
          }
          else{
            res.status(200);
            res.send('Course Edited');
          }
        });
      })
}
