var Course=require('../models/course');
var Enroll=require('../models/enroll');

module.exports.getCourses=function(req,res){
    Course.getCoursesLimit(req,res);
}
module.exports.enrollUser=function(req,res){
    Enroll.enrollUser(req,res);
}
