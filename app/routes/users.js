var express = require('express');
var router = express.Router();
router.get('/users',function(req,res){
  res.send('hello world');
});
module.exports = router;
