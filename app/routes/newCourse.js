var express=require('express');
var addCourse=require('../controllers/course');

var router=express.Router();

router.post('/',function(req,res){
   addCourse.addNewCourse(req,res);
});
router.get('/',function(req,res){
  addCourse.showCourses(req,res);
});
router.delete('/deletecourse/:course_id',function(req,res){
  addCourse.deleteCourse(req,res);
});
router.get('/editcourse/:course_id',function(req,res){
  addCourse.findCourse(req,res);
});

module.exports=router;
