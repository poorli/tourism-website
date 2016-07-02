var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//session
var session = require('express-session');
//用于存储session
//var MongoStore = require('connect-mongodb');
//db的信息
//var setting = require('./moudels/setting');
//db实例
//var db = require('./moudels/db');

var routes = require('./routes/index');
var user = require('./routes/users');
var posts = require('./routes/post');
var login = require('./routes/login');
var reg = require('./routes/reg');
var tourist = require('./routes/tourist');
var company =require('./routes/company');

var app = express();

var Db = require('mongodb').Db,
    Server = require('mongodb').Server,
    server_config = new Server('localhost', 27017, {
        auto_reconnect: true,
        native_parser: true
    }),
    db = new Db('myapp', server_config, {}),
    mongoStore = require('connect-mongodb');

//session配置
app.use(session({
    cookie: { maxAge: 600000},
    secret: "foo",
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        db: db
    })
}));

//app.use(express.compress());
//错误信息处理
app.use(function(req, res, next){
    res.locals.user = req.session.user;
    var err = req.session.error;
    delete req.session.error;
    res.locals.message = "";
    if (err){
        res.locals.message = err;
    }
    next();
});
//路由中间件
app.use(function(req, res, next){
    res.locals.user = req.session.user;
    next();
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/user', user);
app.use('/post', posts);
app.use('/login', login);
app.use('/reg', reg);
app.use('/tourist', tourist);
app.use('/company', company);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = app;
