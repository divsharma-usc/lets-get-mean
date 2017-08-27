var Course=require('../models/course');

module.exports.getCourses=function(req,res){
    Course.getCoursesLimit(req,res);
}
