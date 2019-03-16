let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan');
let ejs = require('ejs');
let bodyParser = require('body-parser');
let cookiesession = require('cookie-session');
let multer = require('multer');

          
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));    
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookiesession({
  keys:['key1','key2'],
  name:'cookie'
}));
app.use(express.static(path.join(__dirname, 'public/template')));
app.use('admin',express.static(path.join(__dirname, 'public/admin')));
app.use('/',express.static(path.join(__dirname, 'public')));

app.use(bodyParser()); 

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(req.url.indexOf("/banner") != -1){
      cb(null, path.join(__dirname, 'public','upload','banner'))
    }else if(req.url.indexOf("/product") != -1){
      cb(null, path.join(__dirname, 'public','upload','product'))
    }else if(req.url.indexOf("/user") != -1){
      cb(null, path.join(__dirname, 'public','upload','user'))
    }
  },
})         
let obj = multer({ storage: storage })
app.use(obj.any());

//admin
app.use('/admin/login',require('./routes/admin/login'));
app.use('/admin/reg',require('./routes/admin/reg'));
app.use('/admin/success',require('./routes/admin/feedback/success'));
app.use('/admin/error',require('./routes/admin/feedback/error'));

app.all('/admin/*',require('./routes/admin/islogin'));

app.use('/admin',require('./routes/admin/home'));
app.use('/admin/home',require('./routes/admin/home'));
app.use('/admin/logout',require('./routes/admin/logout'));
app.use('/admin/banner',require('./routes/admin/banner'));
app.use('/admin/user',require('./routes/admin/user'));

//api
app.use('/api/html',require('./routes/api/home'));
app.use('/api/list',require('./routes/api/list'));
app.use('/api/car',require('./routes/api/list'));
app.use('/api/login',require('./routes/api/login'));
app.use('/api/reg',require('./routes/api/reg'));
      

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('./feedback/app_error');
});

module.exports = app;
