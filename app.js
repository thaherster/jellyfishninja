var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var validator = require('express-validator');
var bodyParser = require('body-parser');
var session = require('express-session');
var FirestoreStore = require( 'firestore-store' )(session);
var passport = require('passport');
var flash = require('express-flash');
var helmet = require('helmet');
var firebase = require("firebase");
require('dotenv').config();
var config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSENGER_ID
};

var admin = require("firebase-admin");


var serviceAccount = require("./dassfafsfkey");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});
var database = admin.firestore();

firebase.initializeApp(config);
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var middlewares = [
    helmet(),
    bodyParser.urlencoded({ extended: true }),
    validator(),
    cookieParser(),
    session({
        secret: process.env.SECRET_KEY,
        store:  new FirestoreStore( {
            database: database
        }),
        resave: true,
        saveUninitialized: true
        // cookie: { maxAge: 60000 }
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
var userRouter = require('./routes/user');
var deviceRouter = require('./routes/device');
var notificationsRouter = require('./routes/notifications');
var applicationsRouter = require('./routes/applications');
var reportsRouter = require('./routes/reports');
var upgradeRouter = require('./routes/upgrade');
var uploadRouter = require('./routes/upload');
var upload_updateRouter = require('./routes/upload_update');
var getappsRouter = require('./routes/getapps');
var qrcodeRouter = require('./routes/qrcode');
var reports_dataRouter = require('./routes/reports_data');
var set_reports_dataRouter = require('./routes/set_reports_data');
var featuresRouter = require('./routes/features');
var pricingRouter = require('./routes/pricing');
var blogRouter = require('./routes/blog');
var companyRouter = require('./routes/company');
var termsandconditionsRouter = require('./routes/termsandconditions');
var paymentRouter = require('./routes/payment');
var getdashdataRouter = require('./routes/getdashdata');

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

app.use(passport.initialize());
app.use(passport.session());

app.use('*', (req,res,next) => {
    res.locals.title = 'Jellyfish Ninja'
    next();
})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/dashboard', dashboardRouter);
app.use('/logout', logoutRouter);
app.use('/forgotpass', forgotpassRouter);
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/device', deviceRouter);
app.use('/notifications', notificationsRouter);
app.use('/applications', applicationsRouter);
app.use('/reports',reportsRouter);
app.use('/upgrade', upgradeRouter);
app.use('/upload', uploadRouter);
app.use('/upload_update', upload_updateRouter);
app.use('/getapps', getappsRouter);
app.use('/qrcode', qrcodeRouter);
app.use('/reports_data', reports_dataRouter);
app.use('/set_reports_data', set_reports_dataRouter);
app.use('/features', featuresRouter);
app.use('/pricing', pricingRouter);
app.use('/blog', blogRouter);
app.use('/company', companyRouter);
app.use('/termsandconditions', termsandconditionsRouter);
app.use('/payment', paymentRouter);
app.use('/getdashdata', getdashdataRouter);

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
