var express = require('express')
,	path = require('path')
, 	session = require('express-session')
,	cookieParser = require('cookie-parser')
,	bodyParser = require('body-parser')
,   methodOverride = require('express-method-override')
, 	eLoad = require('express-load')
,	mongoose = require('mongoose')
,	passport = require('passport');

module.exports = function(){

	var app = express();

	app.set('port', 3000);

	app.use(cookieParser('fitask'));

	app.use(session({
	    secret: 'fitask',
	    saveUninitialized: true, // don't create session until something stored
		resave: true //don't save session if unmodified
	}));

	app.use(passport.initialize());

	app.use(passport.session());

	app.use(bodyParser.json());

	app.use(bodyParser.urlencoded({
		extended:true
	}));

	app.use("/node_modules", express.static('node_modules'));

	eLoad('models')
		.then('controllers')
		.then('routes')
		.into(app);

	app.get('/', function(req, res){
		res.json('Bem vindo!');
	});

	return app;
}
