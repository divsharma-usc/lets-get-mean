var express=require('express');
var addCourse=require('../controllers/course');

var router=express.Router();

router.post('/',function(req,res){
   //addCourse.addNewCourse(req,res);
   addCourse.showCourses(req,res);
});
router.get('/',function(req,res,next){
  addCourse.showCourses(req,res);
})

module.exports=router;
