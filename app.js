var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var validator = require('express-validator');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('express-flash');
var helmet = require('helmet');
var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyBLWcdEobIcG_nqnqpcFvDPOrBWByN2oXQ",
    authDomain: "jellyfishninja-899d1.firebaseapp.com",
    databaseURL: "https://jellyfishninja-899d1.firebaseio.com",
    projectId: "jellyfishninja-899d1",
    storageBucket: "jellyfishninja-899d1.appspot.com",
    messagingSenderId: "379489347774"
};
firebase.initializeApp(config);
// global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var middlewares = [
    helmet(),
    bodyParser.urlencoded({ extended: true }),
    validator(),
    cookieParser(),
    session({
        secret: 'super-secret-key',
        key: 'super-secret-cookie',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 }
    }),
    flash()
];


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var dashboardRouter = require('./routes/dashboard');
var logoutRouter = require('./routes/logout');
var forgotpassRouter = require('./routes/forgotpass');
var registerRouter = require('./routes/register');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(middlewares);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/dashboard', dashboardRouter);
app.use('/logout', logoutRouter);
app.use('/forgotpass', forgotpassRouter);
app.use('/register', registerRouter);

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
  res.render('error');
});



module.exports = app;
