var express=require('express');
var router=express.Router();

var Home=require('../controllers/home');

router.get('/',function(req,res){
    Home.getCourses(req,res);
});

module.exports=router;
