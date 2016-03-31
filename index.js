var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var session = require('express-session');
var config = require('./config')
var mongoose = require('mongoose');
var receptionist = require('./workers/receptionist')

var port = process.env.PORT || 8080;

mongoose.connect(config.mongoUrl);
var db = mongoose.connection;

db.once('open', function(){
	console.log('The funny thing about my kidneys is...')
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('view engine', 'jade');

app.get('/', function(req,res){
	res.send('Welcome to Chloe!');
})

app.post('/message', function(req, res){
	receptionist.webhook(req, res);
})

app.listen(port);
console.log('Let the magic begin at http://localhost:' + port);