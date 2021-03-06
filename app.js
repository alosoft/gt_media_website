let createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    flash = require('connect-flash');


//USER Routes REQUIRES
let User = require('./models/user');
// let indexRouter = require('./routes/index');
// let userRouter = require('./routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// mongoose.connect('mongodb://localhost/gt_media');
mongoose.connect('mongodb://alonso:alonso20@ds125342.mlab.com:25342/gt_media-website');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'Puppy was 14 years before he died',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

////INCLUDE AUTHENTICATION BUTTON LOGIC
///DECLARING A UNIVERSAL VARIABLE
app.use(function (req, res, next) {
    res.locals.activeUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

// app.use(indexRouter);
// app.use(userRouter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/////////////////////////////////////

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// Handle 404
app.use(function (req, res) {
    res.render('error/404');
});

// Handle 500
app.use(function (error, req, res, next) {
    res.render('error/500');
    console.log(error);
});

// // error handler
// app.use(function (err, req, res) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     console.log(err);
//     res.render('error');
// });

module.exports = app;