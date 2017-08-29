var express=require('express');
var router=express.Router();

var Enroll=require('../controllers/enroll');

router.post('/',function(req,res){
     console.log(req.body);
     Enroll.improvePerformance(req,res);
})
router.get('/:course_id/:user_id',function(req,res){
     console.log(req.params);
     Enroll.getEnrollment(req,res);
})

module.exports=router;
