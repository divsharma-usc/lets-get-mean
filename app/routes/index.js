var express = require('express');
var jwt=require('express-jwt');
var ctrlProfile=require('../controllers/profile.js');
var auth=jwt({
  secret:'MY_SECRET',
  userProperty:'payload'
});
var router = express.Router();

router.get('/profile',auth,ctrlProfile.profileRead);

module.exports = router;
