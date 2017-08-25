var Course=require('../models/course');

module.exports.addNewCourse=function(req,res){
           var newCourse=new Course();
           newCourse.course_id=req.body.course_id;
           newCourse.title=req.body.title;
           newCourse.description=req.body.description;
           newCourse.author=req.body.author;
           newCourse.NoOfVedios=req.body.no_of_vedios;
           newCourse.rating=0;
           newCourse.vedios=req.body.secretLairs;
           newCourse.save(function(err){
             if(err){
               console.log(err);
             }
             else{
               res.status(200);
             }
           });
}
module.exports.showCourses=function(req,res){
     Course.getCourses(function(err,courses){
       res.send(courses);
     });
}
module.exports.deleteCourse=function(req,res){
     const course_id=req.params.course_id;
     Course.removeCourse(course_id,function(err,course){
       res.status(200);
       res.send('course deleted');
     });
}
