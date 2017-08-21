var express=require('express');
var router=express.Router();

var authenticate=require('../controllers/authentication');

router.post('/signup',function(req,res,next){
   console.log('eee');
   authenticate.register(req,res);
});

module.exports = router;
