
var express=require('express');
var router=express.Router();

var authenticate=require('../controllers/authentication');

router.post('/',function(req,res,next){
  authenticate.login(req,res);
});

module.exports = router;
