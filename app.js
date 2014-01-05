var express = require('express'),
    routes = require('./routes'),
    path = require('path'),
    mongoose = require('mongoose');

var app = express();
app.directory = __dirname;

mongoose.connect('mongodb://heroku_app20964155:8gcklib6k3i4qni9g9j4t5rpn7@ds059938.mongolab.com:59938/heroku_app20964155');
var db = mongoose.connection;
db.once('open', function () {
  console.log('DB Connection successful');
});

require('./db');

require('./config/environments')(app);
require('./routes')(app);

module.exports = app;
