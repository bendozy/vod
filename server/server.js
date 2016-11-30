var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;
var app = express();
var api = require('./api/api');
var err = require('./middleware/err')
var userModel = require('./api/user/userModel');

// setup the app middlware
require('./middleware/appMiddleware')(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use(cookieParser());
app.use(passport.initialize());

// setup the api
app.use('/api', api);

// passport config

passport.use(new LocalStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());


// mongoose
mongoose.connect('mongodb://localhost/vod');
mongoose.connection.once('connected', function() {
	console.log("Connected to database")
});
app.use(err());

module.exports = app;
