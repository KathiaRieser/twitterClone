const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayouts = require("express-ejs-layouts");
const mongoose = require('mongoose');

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passportConfig = require("./passport");
mongoose.connect("mongodb://localhost/twitter-ironhack");

// ...other code

const index = require('./routes/index');
const users = require('./routes/users');
const auth = require('./routes/auth');
const tweetsController = require("./routes/tweetsController");

const app = express();

// view engine setup
app.use(expressLayouts);
app.set("layout", "layouts/main-layout");
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "basic-auth-secret",
  cookie: { maxAge: 600000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
 }));

 passportConfig(app);

 app.use(express.static(path.join(__dirname, 'public')));
 
 app.use((req,res,next) => {
   res.locals.user = req.user;
   //console.log(res.locals.user)
   next();
  });

  app.use((req,res,next) => {
  res.locals.user = req.user;
  next();
 });
app.use('/', index);
app.use('/', auth);
app.use("/tweets", tweetsController);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
