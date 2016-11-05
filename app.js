
var express = require(__dirname + '/config/express')();
var passport = require('passport');
//require(__dirname +'/config/passport')(passport);
require(__dirname+'/config/database')('mongodb://localhost:27017/fitask');

var app = express;

app.listen(3000, function(){
	console.log('Server works');
});
