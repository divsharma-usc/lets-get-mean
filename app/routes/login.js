
var express=require('express');
var router=express.Router();

var authenticate=require('../controllers/authentication');

router.post('/',function(req,res,next){
  authenticate.login(req,res);
});
router.get('/getUser/:id',function(req,res,next){
  authenticate.getUser(req,res);
});
module.exports = router;
