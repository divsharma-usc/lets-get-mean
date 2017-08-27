var express=require('express');
var router=express.Router();

var Home=require('../controllers/home');

router.get('/',function(req,res){
    Home.getCourses(req,res);
});
router.get('/enroll/:course_id/:user_id',function(req,res){
    Home.enrollUser(req,res);
})

module.exports=router;
