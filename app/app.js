var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport=require('passport');
var mongoose=require('mongoose');
var cors=require('cors');

require('./models/user');
//var register=require('./routes/register');
var index=require('./routes/index');
var users=require('./routes/users');
var authenticate=require('./controllers/authentication');


var app = express();

app.set('view engine','jade');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', index);
app.use('/users', users);
//app.use('/signup',register);
app.post('/signup',function(req,res,next){
  console.log('hello');
  console.log(req.body);
  authenticate.register(req,res);
});
mongoose.connect('mongodb://localhost/mean');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  if(err.name==='UnauthorizedError'){
    res.status(401);
    res.json({"message":err.name+":"+err.message});
  }
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3000);
console.log('app started on port 3000');

module.exports = app;
