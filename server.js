var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// add the body-parser middleware to the server
app.use(bodyParser.urlencoded({ extended: true }));

// serve the public directory as a static file directory
app.use(express.static('public'));

// Require the models directory in server.js
var db = require('./models');
var controllers = require('./controllers');

app.get('/', function homepage (req, res) {
  res.sendFile('views/index.html', { root : __dirname });
});
